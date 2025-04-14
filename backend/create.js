// Insertar nuevo usuario
function insertar() {
    // Obtener y limpiar datos del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    
    // Validar campos requeridos
    if (!nombre || !correo) {
        alert('Por favor complete todos los campos');
        return false;
    }

    // Validar formato de email
    if (!validarEmail(correo)) {
        alert('Ingrese un correo electrónico válido');
        return false;
    }

    // Guardar usuario y redirigir
    guardarUsuario({nombre, correo});
    alert('Usuario registrado!');
    limpiarFormulario();
    setTimeout(() => window.location.href = 'index.html', 1000);
    return false;
}

// Validar formato de email con expresión regular
function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Guardar en localStorage
function guardarUsuario(usuario) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuario.id = usuarios.length + 1; // ID autoincremental
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// Limpiar campos del formulario
function limpiarFormulario() {
    document.getElementById('nombre').value = '';
    document.getElementById('correo').value = '';
}

// Evento submit del formulario
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formUsuario');
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        insertar();
    });
});