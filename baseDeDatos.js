const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('registrosBitacora.db');

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS registros (' +
    'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
    'nombre_usuario TEXT,' +
    'num_solicitud TEXT,' +
    'clave_muestra TEXT,' +
    'fuentes_empleadas TEXT,' +
    'duracion_analisis TEXT,' +
    'tiempo_vida_filamentos TEXT,' +
    'presion_camara_analisis NUMERIC,' +
    'observaciones TEXT,' +
    'fecha TEXT)');
});

process.on('exit', () => {
  db.close();
});

module.exports = db;
