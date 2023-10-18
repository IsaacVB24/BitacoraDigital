const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Ruta completa al archivo registrosBitacora.db
const dbPath = path.join(__dirname, '..', 'registrosBitacora.db');

const db = new sqlite3.Database(dbPath);

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

// Función para actualizar un registro por su ID
function actualizarRegistro(idRegistro, registroModificado) {
  const sql = `
    UPDATE registros
    SET nombre_usuario = ?,
        num_solicitud = ?,
        clave_muestra = ?,
        fuentes_empleadas = ?,
        duracion_analisis = ?,
        tiempo_vida_filamentos = ?,
        presion_camara_analisis = ?,
        observaciones = ?,
        fecha = ?
    WHERE id = ?`;
  const params = [
    registroModificado.nombre_usuario,
    registroModificado.num_solicitud,
    registroModificado.clave_muestra,
    registroModificado.fuentes_empleadas,
    registroModificado.duracion_analisis,
    registroModificado.tiempo_vida_filamentos,
    registroModificado.presion_camara_analisis,
    registroModificado.observaciones,
    registroModificado.fecha,
    idRegistro,
  ];

  db.run(sql, params, function (err) {
    if (err) {
      console.error('Error al actualizar el registro:', err.message);
    }
  });
}

// Función para eliminar un registro por su ID
function eliminarRegistroPorId(registroId, callback) {
  const sql = 'DELETE FROM registros WHERE id = ?';
  db.run(sql, registroId, function (err) {
    if (err) {
      console.error('Error al eliminar el registro:', err.message);
      callback(err);
    } else {
      callback(null);
    }
  });
}

process.on('exit', () => {
  db.close();
});

module.exports = {
  db,
  guardarRegistro,
  actualizarRegistro,
  eliminarRegistroPorId,
};