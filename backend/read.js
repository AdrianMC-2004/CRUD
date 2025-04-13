// Importamos la instancia de la base de datos (db) que definimos previamente
const db = require('./db');

// Definimos una función para obtener todos los usuarios desde la base de datos
function getUsuarios(callback) {
  // Definimos la consulta SQL para seleccionar todos los registros de la tabla 'usuarios'
  const sql = 'SELECT * FROM usuarios';
  
  // Ejecutamos la consulta utilizando el método 'all' de SQLite, que obtiene todas las filas que coinciden con la consulta
  db.all(sql, [], (err, rows) => {
    if (err) {
      // Si ocurre un error durante la ejecución de la consulta, pasamos el error al callback
      callback(err);
    } else {
      // Si la consulta es exitosa, pasamos los resultados (las filas obtenidas) al callback
      callback(null, rows);
    }
  });
}

// Exportamos la función 'getUsuarios' para que pueda ser utilizada en otras partes de la aplicación
module.exports = getUsuarios;
