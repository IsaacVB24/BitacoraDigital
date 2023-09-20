const express = require('express');
const router = express.Router();
const path = require('path');
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

// Agregar más rutas según tus necesidades

// Ruta para manejar la creación de registros
router.post('/crearRegistro', (req, res) => {
    const nuevoRegistro = req.body; // Aquí debes recuperar los datos del formulario
    baseDeDatos.guardarRegistro(nuevoRegistro); // Llama a la función para guardar el registro
    res.redirect('/'); // Redirige de vuelta a la página principal
});

module.exports = router;
