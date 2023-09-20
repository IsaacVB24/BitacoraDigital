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
        duracion_analisis: `${req.body.hdurAn}:${req.body.mdurAn}`,
        tiempo_vida_filamentos: `${req.body.hxfti}:${req.body.mxfti}`,
        presion_camara_analisis: req.body.presCam,
        observaciones: req.body.observaciones,
        fecha: new Date().toLocaleDateString(), // Obtener la fecha del sistema
    };

    baseDeDatos.guardarRegistro(nuevoRegistro); // Llama a la función para guardar el registro
    res.redirect('/'); // Redirige de vuelta a la página principal
});

module.exports = router;