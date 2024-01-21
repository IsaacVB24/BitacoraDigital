const cron = require('node-cron');
const path = require('path');
const fs = require('fs').promises;

// Ruta completa al archivo registrosBitacora.db
const dbPath = path.join(__dirname, 'baseDeDatos', '_registrosBitacora.db');

// Ruta completa al directorio de respaldos
const respaldosPath = path.join(__dirname, 'baseDeDatos', 'respaldos');

// Programar la tarea para ejecutarse el respaldo los primeros lunes de cada mes a las 10am
// Añadir viernes a las 10am
cron.schedule('0 10 * * 1-7', async () => {
    console.log('-----------------------------------------------------\nIniciando respaldo...');

    const fecha = new Date();
    const anio = fecha.getFullYear();
    const mes = fecha.toLocaleString('default', { month: 'long' }).toLowerCase();

    // Archivo de destino para el respaldo
    const nombreRespaldo = `${mes}_${anio}.db`;
    const destinoRespaldo = path.join(respaldosPath, nombreRespaldo);

    try {
        // Realizar el respaldo utilizando fs.copyFile
        await fs.copyFile(dbPath, destinoRespaldo);
        console.log(`Respaldo completado: ${nombreRespaldo}`);
    } catch (error) {
        console.error(`Error al realizar el respaldo: ${error.message}`);
    }
}, {
    scheduled: true,
    timezone: 'America/Mexico_City'
});