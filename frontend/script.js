// Esta función se ejecuta cuando la página se ha cargado completamente
window.onload = () => {
<<<<<<< HEAD
  
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
=======
  const tableBody = document.querySelector('#usuariosTable tbody');

  // Verificamos si existe la tabla de usuarios para listar, actualizar o eliminar
  if (tableBody) {
    axios.get('http://localhost:3000/api/usuarios')
      .then((response) => {
        const usuarios = response.data;

        tableBody.innerHTML = usuarios.map(user => `
          <tr data-id="${user.id}">
            <td>${user.id}</td>
            <td contenteditable="true" class="editable nombre">${user.nombre}</td>
            <td contenteditable="true" class="editable correo">${user.correo}</td>
            <td>
              <button onclick="guardarCambios(${user.id})">Actualizar</button>
              <button onclick="eliminarUsuario(${user.id})">Eliminar</button>
            </td>
          </tr>
        `).join('');
      });
  }

  // Si existe el formulario para insertar usuario
  const form = document.getElementById('insertarForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nombre = document.getElementById('nombre').value.trim();
      const correo = document.getElementById('correo').value.trim();

      if (!nombre || !correo) {
        alert('Por favor, completa todos los campos.');
        return;
      }

      axios.post('http://localhost:3000/api/usuarios', { nombre, correo })
        .then(() => {
          alert('✅ Usuario insertado correctamente');
          window.location.href = 'index.html';
        })
        .catch(err => {
          alert('❌ Error al insertar usuario');
          console.error(err);
>>>>>>> feature/update
        });
    });
  }
};

<<<<<<< HEAD
// Esta función se encarga de eliminar un usuario según el ID proporcionado
function eliminarUsuario(id) {
  // Realizamos una solicitud DELETE para eliminar el usuario con el ID correspondiente
  axios.delete(`http://localhost:3000/api/usuarios/${id}`)
    .then(() => {
      // Si la eliminación es exitosa, recargamos la página para reflejar los cambios
      window.location.reload();
    });
=======
// Actualizar usuario (botón dentro de la tabla)
function guardarCambios(id) {
  const fila = document.querySelector(`tr[data-id="${id}"]`);
  const nombre = fila.querySelector('.nombre').innerText.trim();
  const correo = fila.querySelector('.correo').innerText.trim();

  if (!nombre || !correo) {
    alert('Por favor, completa los campos antes de actualizar.');
    return;
  }

  axios.put(`http://localhost:3000/api/usuarios/${id}`, { nombre, correo })
    .then(() => {
      alert('✅ Usuario actualizado correctamente');
    })
    .catch(err => {
      alert('❌ Error al actualizar usuario');
      console.error(err);
    });
}

// Eliminar usuario
function eliminarUsuario(id) {
  if (confirm('¿Estás seguro de eliminar este usuario?')) {
    axios.delete(`http://localhost:3000/api/usuarios/${id}`)
      .then(() => {
        window.location.reload();
      })
      .catch(err => {
        alert('❌ Error al eliminar usuario');
        console.error(err);
      });
  }
>>>>>>> feature/update
}