const db = require('./db');

function getUsuarios(callback) {
  const sql = 'SELECT * FROM usuarios';
  db.all(sql, [], (err, rows) => {
    if (err) {
      callback(err);
    } else {
      callback(null, rows);
    }
  });
}

module.exports = getUsuarios;
