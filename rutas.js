const path = require('path');

const express = require('express');
const router = express.Router();
const baseDeDatos = require('./baseDeDatos'); // Importa el módulo baseDeDatos.js

// Página principal
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'main.html'));
});

// Rutas relacionadas con registros
router.get('/crearRegistro', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'crearRegistro.html'));
});

router.get('/modificarRegistro', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'modificarRegistro.html'));
});

router.get('/visualizarRegistro', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'visualizarRegistro.html'));
});

// Ruta para manejar la creación de registros
router.post('/crearRegistro', (req, res) => {
    const nuevoRegistro = {
        nombre_usuario: req.body.nomUs,
        num_solicitud: req.body.numSol,
        clave_muestra: req.body.clavMues,
        fuentes_empleadas: req.body.fuenEmpl,
        duracion_analisis: `${req.body.durAn}`,
        tiempo_vida_filamentos: `${req.body.xfti}`,
        presion_camara_analisis: req.body.presCam,
        observaciones: req.body.observaciones,
        fecha: new Date().toLocaleDateString(),     // Obtener la fecha del sistema
      };

    baseDeDatos.guardarRegistro(nuevoRegistro); // Llama a la función para guardar el registro
    res.redirect('/'); // Redirige de vuelta a la página principal
});

// Ruta para obtener registros desde la base de datos
router.get('/obtenerRegistros', (req, res) => {
    baseDeDatos.db.all('SELECT * FROM registros', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Error al obtener registros' });
        } else {
            res.json(rows); // Devuelve los registros en formato JSON
        }
    });
});

// Ruta para eliminar registros
router.post('/eliminarRegistros', (req, res) => {
    const registrosAEliminar = req.body.registros;
    if (!registrosAEliminar || registrosAEliminar.length === 0) {
        res.json({ success: false, message: 'No se proporcionaron registros para eliminar.' });
        return;
    }
    
    const resultados = [];
    
    registrosAEliminar.forEach(registroId => {
        baseDeDatos.eliminarRegistroPorId(registroId, err => {
            if (err) {
                console.error('Error al eliminar el registro:', err);
                resultados.push({ success: false, id: registroId, error: err.message }); // Agrega el mensaje de error al objeto de resultado
            } else {
                resultados.push({ success: true, id: registroId });
            }
            
            // Si se procesaron todos los registros
            if (resultados.length === registrosAEliminar.length) {
                const exitoso = resultados.every(resultado => resultado.success);
                if (exitoso) {
                    res.json({ success: true, message: 'Registros eliminados con éxito.' });
                } else {
                    res.json({ success: false, message: 'Error al eliminar algunos registros.', results: resultados });
                }
            }
        });
    });
});

module.exports = router;