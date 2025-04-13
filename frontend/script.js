// Obtener usuarios
window.onload = () => {
    if (document.getElementById('usuariosTable')) {
      axios.get('http://localhost:3000/api/usuarios')
        .then((response) => {
          const usuarios = response.data;
          const tbody = document.querySelector('#usuariosTable tbody');
          tbody.innerHTML = usuarios.map(user => `
            <tr>
              <td>${user.id}</td>
              <td>${user.nombre}</td>
              <td>${user.correo}</td>
              <td>
                <button onclick="eliminarUsuario(${user.id})">Eliminar</button>
              </td>
            </tr>
          `).join('');
        });
    }
  
    // Insertar usuario
    const form = document.getElementById('insertarForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const correo = document.getElementById('correo').value;
  
        axios.post('http://localhost:3000/api/usuarios', { nombre, correo })
          .then(() => {
            window.location.href = 'index.html';
          });
      });
    }
  };
  
  // Eliminar usuario
  function eliminarUsuario(id) {
    axios.delete(`http://localhost:3000/api/usuarios/${id}`)
      .then(() => {
        window.location.reload();
      });
  }
  