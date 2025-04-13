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
    }
  });
});

module.exports = db;
