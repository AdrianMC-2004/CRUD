const db = require('./db'); // Asegúrate de que tienes el archivo db.js con la conexión SQLite

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

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'usuarios.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error al conectar con la base de datos:', err.message);
  } else {
    console.log('✅ Conexión exitosa a la base de datos SQLite');
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      correo TEXT NOT NULL
    )
  `, (err) => {
    if (err) {
      console.error('❌ Error al crear la tabla "usuarios":', err.message);
      return;
    }

    console.log('✅ Tabla "usuarios" lista');

    // Verificar si la tabla está vacía
    db.get('SELECT COUNT(*) AS total FROM usuarios', (err, row) => {
      if (err) {
        console.error('❌ Error al contar usuarios:', err.message);
        return;
      }

      console.log(`🔍 Total de usuarios en la tabla: ${row.total}`);

      if (row.total === 0) {
        const nombre = 'Adrian Prueba 123';
        const correo = 'adriah@senati.pe';

        db.run(
          'INSERT INTO usuarios (nombre, correo) VALUES (?, ?)',
          [nombre, correo],
          function (err) {
            if (err) {
              console.error('❌ Error al insertar usuario por defecto:', err.message);
            } else {
              console.log(`✅ Usuario por defecto insertado con ID ${this.lastID}`);
            }
          }
        );
      }
    });
  });
});