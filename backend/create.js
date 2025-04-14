// Funciones básicas del CRUD
function insertar() {
    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    
    if (!nombre || !correo) return alert('Complete todos los campos');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) return alert('Correo inválido');

    const usuario = {
        id: Date.now(), // ID único
        nombre,
        correo
    };

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
    alert('Usuario registrado!');
    limpiarFormulario();
    actualizarTabla();
}

function actualizarTabla() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const tbody = document.querySelector('#usuariosTable tbody');
    
    if (tbody) {
        tbody.innerHTML = usuarios.map(usuario => `
            <tr>
                <td>${usuario.id}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.correo}</td>
                <td>
                    <button onclick="eliminarUsuario(${usuario.id})">Eliminar</button>
                </td>
            </tr>
        `).join('');
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formUsuario');
    if (form) form.addEventListener('submit', (e) => {
        e.preventDefault();
        insertar();
    });
    
    if (document.getElementById('usuariosTable')) actualizarTabla();
});