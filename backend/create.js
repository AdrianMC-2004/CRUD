const db = require('./db');

function createUsuario(nombre, correo, callback) {
  const sql = 'INSERT INTO usuarios (nombre, correo) VALUES (?, ?)';
  db.run(sql, [nombre, correo], function (err) {
    if (err) {
      callback(err);
    } else {
      callback(null, { id: this.lastID, nombre, correo });
    }
  });
}

module.exports = createUsuario;
