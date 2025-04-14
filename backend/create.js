// Función para insertar usuarios
function insertar() {
    // Obtener los valores del formulario
    var nombre = document.getElementById('nombre').value.trim();
    var correo = document.getElementById('correo').value.trim();
    
    // Validar que los campos no estén vacíos
    if (!nombre || !correo) {
        alert('Por favor complete todos los campos');
        return false;
    }

    // Validar formato de email
    if (!validarEmail(correo)) {
        alert('Por favor ingrese un correo electrónico válido');
        return false;
    }

    // Crear objeto con los datos del usuario
    var usuario = {
        nombre: nombre,
        correo: correo
    };

    // Enviar datos al servidor (simulado con localStorage para este ejemplo)
    guardarUsuario(usuario);
    
    // Mostrar mensaje de éxito
    alert('Usuario registrado correctamente');
    
    // Limpiar el formulario
    document.getElementById('nombre').value = '';
    document.getElementById('correo').value = '';
    
    // Redirigir a la página principal después de 1 segundo
    setTimeout(function() {
        window.location.href = 'index.html';
    }, 1000);
    
    return false; // Prevenir envío tradicional del formulario
}

// Función para validar formato de email
function validarEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Función para guardar usuario (simulando backend con localStorage)
function guardarUsuario(usuario) {
    // Obtener usuarios existentes o inicializar array si no hay
    var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    // Asignar ID (simulando autoincremental)
    usuario.id = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
    
    // Agregar nuevo usuario
    usuarios.push(usuario);
    
    // Guardar en localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// Asignar evento al formulario (asumiendo que tienes un formulario con id="formUsuario")
document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('formUsuario');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Evitar envío tradicional
            insertar();
        });
    }
});

insertar();