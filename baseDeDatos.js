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

// Función para guardar un nuevo registro en la base de datos
function guardarRegistro(nuevoRegistro) {
  const stmt = db.prepare('INSERT INTO registros (nombre_usuario, num_solicitud, clave_muestra, fuentes_empleadas, duracion_analisis, tiempo_vida_filamentos, presion_camara_analisis, observaciones, fecha) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
  stmt.run(
    nuevoRegistro.nombre_usuario,
    nuevoRegistro.num_solicitud,
    nuevoRegistro.clave_muestra,
    nuevoRegistro.fuentes_empleadas,
    nuevoRegistro.duracion_analisis,
    nuevoRegistro.tiempo_vida_filamentos,
    nuevoRegistro.presion_camara_analisis,
    nuevoRegistro.observaciones,
    nuevoRegistro.fecha
  );
  stmt.finalize();
}

process.on('exit', () => {
  db.close();
});

module.exports = {
  db,
  guardarRegistro,
};