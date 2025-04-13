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

module.exports = db;
