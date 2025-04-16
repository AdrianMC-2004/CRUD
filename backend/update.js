
const db = require('./db');

function updateUsuario(id, nombre, correo, callback) {
  const query = 'UPDATE usuarios SET nombre = ?, correo = ? WHERE id = ?';

  db.run(query, [nombre, correo, id], function (err) {
    if (err) {
      console.error('❌ Error al actualizar usuario:', err.message);
      callback(err);
    } else {
      console.log(`✅ Usuario con ID ${id} actualizado`);
      callback(null);
    }
  });
}

module.exports = updateUsuario;