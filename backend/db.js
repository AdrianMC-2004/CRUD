
const sqlite3 = require('sqlite3').verbose();

const path = require('path');


const dbPath = path.resolve(__dirname, 'usuarios.db');


const db = new sqlite3.Database(dbPath, (err) => {
  
  if (err) {
    console.error('Error al conectar con la base de datos', err);
  } else {
    console.log('Conexión exitosa a la base de datos SQLite');
  }
});


db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,   // El campo 'id' es clave primaria y se autoincrementará
      nombre TEXT NOT NULL,                    // El campo 'nombre' debe ser de tipo texto y no puede ser nulo
      correo TEXT NOT NULL                     // El campo 'correo' debe ser de tipo texto y no puede ser nulo
    )
  `, (err) => {
    
    if (err) {
      console.error('Error al crear la tabla usuarios', err.message);
    } else {
      console.log('Tabla "usuarios" lista'); 

      
      db.get('SELECT COUNT(*) AS total FROM usuarios', (err, row) => {
        if (err) {
          console.error('Error al contar usuarios:', err.message); 
        } else if (row.total === 0) {  
          
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
