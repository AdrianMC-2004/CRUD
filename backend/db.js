const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Ruta de la base de datos
const dbPath = path.resolve(__dirname, 'usuarios.db');

// Crear la base de datos (si no existe)
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos', err);
  } else {
    console.log('Conexión exitosa a la base de datos SQLite');
  }
});

// Crear tabla si no existe
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      correo TEXT NOT NULL
    )
  `, (err) => {
    if (err) {
      console.error('Error al crear la tabla usuarios', err.message);
    } else {
      console.log('Tabla "usuarios" lista');

      // Verificar si la tabla está vacía
      db.get('SELECT COUNT(*) AS total FROM usuarios', (err, row) => {
        if (err) {
          console.error('Error al contar usuarios:', err.message);
        } else if (row.total === 0) {
          // Insertar un usuario por defecto
          db.run(
            'INSERT INTO usuarios (nombre, correo) VALUES (?, ?)',
            ['Juan Pérez', 'juan@example.com'],
            function (err) {
              if (err) {
                console.error('Error al insertar usuario por defecto:', err.message);
              } else {
                console.log(`Usuario por defecto insertado con ID ${this.lastID}`);
              }
            }
          );
        }
      });
    }
  });
});

module.exports = db;
