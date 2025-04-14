function insertar() {
    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    
    if (!nombre || !correo) {
        alert('Complete todos los campos');
        return false;
    }

    if (!validarEmail(correo)) {
        alert('Ingrese un correo válido');
        return false;
    }

    // guardar mensaje
    guardarUsuario({nombre, correo});
    alert('Usuario registrado!');
    limpiarFormulario();
    
    // actualizar tabla 
    actualizarTabla();
    setTimeout(() => window.location.href = 'index.html', 1000);
    return false;
}

function actualizarTabla() {
    // obtener usuarios de localStorage o array vacío
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const tbody = document.querySelector('#usuariosTable tbody');
    if (tbody) {
        tbody.innerHTML = usuarios.map(usuario => `
            <tr>
                <td>${usuario.id}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.correo}</td>
                <td>
                    <button onclick="editarUsuario(${usuario.id})">Editar</button>
                    <button onclick="eliminarUsuario(${usuario.id})">Eliminar</button>
                </td>
            </tr>
        `).join('');
    }
}

// validar formato de email
function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// guardar usuario 
function guardarUsuario(usuario) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuario.id = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// limpiar campos
function limpiarFormulario() {
    document.getElementById('nombre').value = '';
    document.getElementById('correo').value = '';
}

//cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // configurar submit 
    const form = document.getElementById('formUsuario');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            insertar();
        });
    }
    
    // si esta la tabla cargar datos al iniciar
    if (document.getElementById('usuariosTable')) {
        actualizarTabla();
    }
});