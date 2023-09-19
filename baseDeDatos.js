const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mi_base_de_datos.db');

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS registros (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre_usuario TEXT, num_solicitud INTEGER, fecha TEXT, clave_muestra TEXT, fuentes TEXT, observaciones TEXT)');
});

process.on('exit', () => {
  db.close();
});

module.exports = db;
