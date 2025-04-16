const db = require('./db');

function deleteUsuario(id, callback) {
  const query = 'DELETE FROM usuarios WHERE id = ?';

  db.run(query, [id], function (err) {
    if (err) {
      console.error('❌ Error al eliminar usuario:', err.message);
      callback(err);
    } else {
      console.log("✅ Usuario con ID ${id} eliminado");
      callback(null);
    }
  });
}

module.exports = deleteUsuario;