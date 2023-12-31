const path = require('path');
const express = require('express');
const app = express();
const { exec } = require('child_process');
const puerto = 3000; // Número de puerto que esté disponible
// Para saber si un puerto está disponible, no se mostrará nada en el cmd después de ejecutar en Windows 'netstat -an | findstr "3000"'

const respaldoScriptPath = 'respaldo.js';  

// Ejecutar respaldo.js con pm2
exec(`pm2 start ${respaldoScriptPath} --name Respaldo`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error al ejecutar el script de respaldo: ${error}`);
    return;
  }
  console.log(`Script de respaldo iniciado con éxito: ${stdout}`);
});

// Configuración para servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para analizar datos de formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Agrega soporte para JSON

// Rutas de la aplicación
const rutas = require('./rutas'); // Importa las rutas desde el archivo rutas.js
app.use('/', rutas);

// Middleware para manejar errores 404
app.use((req, res, next) => {
    res.status(404).send('Página no encontrada');
});

// Iniciar el servidor
app.listen(puerto, () => {
    console.log(`Servidor en funcionamiento en http://localhost:${puerto}`);
});