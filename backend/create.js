const db = require('./db'); 

function createUsuario(nombre, correo, callback) {
  const query = 'INSERT INTO usuarios (nombre, correo) VALUES (?, ?)';
  
  db.run(query, [nombre, correo], function (err) {
    if (err) {
      console.error('❌ Error al insertar usuario:', err.message);
      callback(err);
    } else {
      console.log(`✅ Usuario insertado con ID ${this.lastID}`);
      callback(null, { id: this.lastID, nombre, correo });
    }
  });
}

module.exports = createUsuario;

