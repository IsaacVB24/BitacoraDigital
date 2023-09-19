const path = require('path');
const express = require('express');
const app = express();
const puerto = 3000; // Número de puerto que esté disponible
// Para saber si un puerto está disponible, no se mostrará nada en el cmd después de ejecutar en Windows 'netstat -an | findstr "3000"'

// Configuración para servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Rutas de la aplicación
const rutas = require('./rutas'); // Importa las rutas desde el archivo rutas.js
app.use('/', rutas);

// Iniciar el servidor
app.listen(puerto, () => {
    console.log(`Servidor en funcionamiento en http://localhost:${puerto}`);
});
