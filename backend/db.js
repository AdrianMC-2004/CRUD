// Importar la librería sqlite3 que nos permitirá interactuar con la base de datos SQLite
const sqlite3 = require('sqlite3').verbose();
// Importar la librería path para manejar las rutas de archivos
const path = require('path');

// Definir la ruta de la base de datos. El archivo usuarios.db se creará en la misma carpeta que este script
const dbPath = path.resolve(__dirname, 'usuarios.db');

// Crear la base de datos (si no existe) y establecer la conexión
const db = new sqlite3.Database(dbPath, (err) => {
  // Si ocurre un error al conectar con la base de datos, lo mostramos en consola
  if (err) {
    console.error('Error al conectar con la base de datos', err);
  } else {
    console.log('Conexión exitosa a la base de datos SQLite');
  }
});

// Crear la tabla "usuarios" si no existe. Esto se hace para asegurarse de que la tabla esté disponible en la base de datos
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,   // El campo 'id' es clave primaria y se autoincrementará
      nombre TEXT NOT NULL,                    // El campo 'nombre' debe ser de tipo texto y no puede ser nulo
      correo TEXT NOT NULL                     // El campo 'correo' debe ser de tipo texto y no puede ser nulo
    )
  `, (err) => {
    // Si ocurre un error al crear la tabla, se muestra en consola
    if (err) {
      console.error('Error al crear la tabla usuarios', err.message);
    } else {
      console.log('Tabla "usuarios" lista'); // Si no hay error, se muestra que la tabla fue creada correctamente

      // Verificar si la tabla 'usuarios' está vacía (no tiene registros)
      db.get('SELECT COUNT(*) AS total FROM usuarios', (err, row) => {
        if (err) {
          console.error('Error al contar usuarios:', err.message); // Si hay un error, se muestra
        } else if (row.total === 0) {  // Si la tabla está vacía
          // Insertamos un usuario por defecto (esto es útil para que la tabla no esté vacía al inicio)
          db.run(
            'INSERT INTO usuarios (nombre, correo) VALUES (?, ?)',  // Realizamos la inserción en la tabla
            ['Juan Pérez', 'juan@example.com'],  // Los valores a insertar (nombre y correo)
            function (err) {
              if (err) {
                console.error('Error al insertar usuario por defecto:', err.message); // Si ocurre un error, lo mostramos
              } else {
                console.log(`Usuario por defecto insertado con ID ${this.lastID}`); // Si la inserción es exitosa, mostramos el ID del nuevo usuario
              }
            }
          );
        }
      });
    }
  });
});

// Exportamos la instancia de la base de datos para que pueda ser utilizada en otras partes de la aplicación
module.exports = db;
