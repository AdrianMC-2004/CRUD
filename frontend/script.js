// Esta función se ejecuta cuando la página se ha cargado completamente
window.onload = () => {
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
        });
    });
  }
};

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
}