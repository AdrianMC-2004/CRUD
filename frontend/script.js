// Esta función se ejecuta cuando la página se ha cargado completamente
window.onload = () => {
  
    // Verificamos si el elemento con id 'usuariosTable' existe en la página
    if (document.getElementById('usuariosTable')) {
      
      // Realizamos una solicitud GET para obtener los usuarios desde la API
      axios.get('http://localhost:3000/api/usuarios')
        .then((response) => {
          const usuarios = response.data;  // Almacenamos los usuarios obtenidos de la respuesta
          const tbody = document.querySelector('#usuariosTable tbody');  // Seleccionamos el cuerpo de la tabla donde se insertarán los usuarios
          
          // Llenamos la tabla con los usuarios obtenidos
          tbody.innerHTML = usuarios.map(user => `
            <tr>
              <td>${user.id}</td>
              <td>${user.nombre}</td>
              <td>${user.correo}</td>
              <td>
                <button onclick="eliminarUsuario(${user.id})">Eliminar</button>
              </td>
            </tr>
          `).join('');  // Usamos map para iterar sobre los usuarios y luego unimos las filas de la tabla
        });
    }
  
    // Seleccionamos el formulario para insertar un nuevo usuario
    const form = document.getElementById('insertarForm');
    if (form) {
      // Añadimos un evento para que se ejecute cuando se envíe el formulario
      form.addEventListener('submit', (e) => {
        e.preventDefault();  // Prevenimos el comportamiento predeterminado de enviar el formulario
        
        // Obtenemos los valores de los campos 'nombre' y 'correo' del formulario
        const nombre = document.getElementById('nombre').value;
        const correo = document.getElementById('correo').value;
  
        // Realizamos una solicitud POST para agregar un nuevo usuario
        axios.post('http://localhost:3000/api/usuarios', { nombre, correo })
          .then(() => {
            // Si la solicitud es exitosa, redirigimos al usuario a la página de inicio
            window.location.href = 'index.html';
          });
      });
    }
  };
  
  // Esta función se encarga de eliminar un usuario según el ID proporcionado
  function eliminarUsuario(id) {
    // Realizamos una solicitud DELETE para eliminar el usuario con el ID correspondiente
    axios.delete(`http://localhost:3000/api/usuarios/${id}`)
      .then(() => {
        // Si la eliminación es exitosa, recargamos la página para reflejar los cambios
        window.location.reload();
      });
  }
  