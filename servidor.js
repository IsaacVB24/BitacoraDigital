const path = require('path');

const express = require('express');
const app = express();
const puerto = 3000; // Número de puerto que esté disponible
// Para saber si un puerto está disponible, no se mostrará nada en el cmd después de ejecutar en Windows 'netstat -an | findstr "3000"'

// Ruta de inicio
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la Bitácora Digital!');
});

// Ruta para la página de creación de registros
app.get('/crear-registro', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'crearRegistro.html'));
});

// Ruta para la página de modificación de registros
app.get('/modificar-registro', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'modificarRegistro.html'));
});

// Ruta para la página principal
app.get('/inicio', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'main.html'));
});

// Ruta para la página de visualización de registros
app.get('/visualizar-registro', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'visualizarRegistro.html'));
});

// Iniciar el servidor
app.listen(puerto, () => {
    console.log(`Servidor en funcionamiento en http://localhost:${puerto}`);
});