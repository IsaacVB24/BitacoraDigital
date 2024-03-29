const path = require('path');

const express = require('express');
const router = express.Router();
const baseDeDatos = require('./baseDeDatos'); // Importa el módulo baseDeDatos.js
const { exec } = require('child_process');

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
    const obtenerDigitoDos = (digito) => (digito < 10 ? '0' : '') + digito;

    const fechaActual = new Date();
    const nuevoRegistro = {
        nombre_usuario: req.body.nomUs,
        num_solicitud: req.body.numSol,
        clave_muestra: req.body.clavMues,
        fuentes_empleadas: req.body.fuenEmpl,
        duracion_analisis: `${req.body.durAn}`,
        tiempo_vida_filamentos: `${req.body.xfti}`,
        presion_camara_analisis: req.body.presCam,
        observaciones: req.body.observaciones,
        fecha: obtenerDigitoDos(fechaActual.getDate()) + '/' +
               obtenerDigitoDos(fechaActual.getMonth() + 1) + '/' +
               fechaActual.getFullYear(),
        diametro_haz: req.body.diamHaz,
        precamara: req.body.precamara,
        camara: req.body.camAnalisis,
    };

    baseDeDatos.guardarRegistro(nuevoRegistro); // Llama a la función para guardar el registro
    res.redirect('/'); // Redirige de vuelta a la página principal
});

// Ruta para manejar la modificación de un registro
router.post('/modificarRegistro', (req, res) => {
    const registroAModificar = {
        nombre_usuario: req.body.nomUs,
        num_solicitud: req.body.numSol,
        clave_muestra: req.body.clavMues,
        fuentes_empleadas: req.body.fuenEmpl,
        duracion_analisis: `${req.body.durAn}`,
        tiempo_vida_filamentos: `${req.body.xfti}`,
        presion_camara_analisis: req.body.presCam,
        observaciones: req.body.observaciones,
        diametro_haz: req.body.diamHaz,
        precamara: req.body.precamara,
        camara: req.body.camAnalisis,
    };

    // Recupera la fecha original del registro desde la base de datos
    baseDeDatos.db.get('SELECT fecha FROM registros WHERE id = ?', [req.body.idRegistro], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Error al obtener la fecha original' });
        } else if (row) {
            registroAModificar.fecha = row.fecha; // Usa la fecha original
            baseDeDatos.actualizarRegistro(req.body.idRegistro, registroAModificar);
            res.redirect('/');
        } else {
            // Maneja el caso en el que no se encuentra el registro
            res.status(404).json({ error: 'Registro no encontrado' });
        }
    });
});

// Ruta para obtener los últimos 20 registros desde la base de datos
router.get('/obtenerRegistros', (req, res) => {
    baseDeDatos.db.all('SELECT *, substr(duracion_analisis, 7) AS duracion_analisis FROM registros ORDER BY fecha DESC LIMIT 20', (err, rows) => {
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

// Ruta para eliminar un registro por su ID
router.delete('/eliminarRegistro/:idRegistro', (req, res) => {
    const registroId = req.params.idRegistro;

    baseDeDatos.eliminarRegistroPorId(registroId, (error) => {
        if (error) {
            console.error('Error al eliminar el registro:', error);
            res.status(500).json({ success: false, message: 'Error al eliminar el registro' });
        } else {
            res.status(200).json({ success: true, message: 'Registro eliminado con éxito' });
        }
    });
});

// Ruta para obtener los detalles de un registro por su ID
router.get('/obtenerRegistro/:id', (req, res) => {
    const registroId = req.params.id;

    // Lógica para obtener los detalles del registro por su ID
    baseDeDatos.db.get('SELECT * FROM registros WHERE id = ?', [registroId], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Error al obtener el registro' });
        } else if (row) {
            // Si se encuentra un registro, asigna los detalles a registroEncontrado
            const registroEncontrado = row;
            //console.log(registroEncontrado);
            res.json({ registro: registroEncontrado });
        } else {
            // Si no se encuentra un registro, responde con un estado 404
            res.status(404).json({ error: 'Registro no encontrado' });
        }
    });
});

// Ruta para manejar búsquedas
router.get('/buscarRegistros', (req, res) => {
    const terminoBusqueda = req.query.termino;

    // Lógica para buscar en la base de datos según el término de búsqueda
    const sql = `
        SELECT * FROM registros
        WHERE nombre_usuario LIKE ? OR
              num_solicitud LIKE ? OR
              fecha LIKE ?
    `;

    const params = Array.from({ length: 3 }, () => `%${terminoBusqueda}%`);

    baseDeDatos.db.all(sql, params, (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Error al realizar la búsqueda' });
        } else {
            res.json(rows); // Devuelve los resultados de la búsqueda en formato JSON
        }
    });
});

// Ruta para obtener fechas completas desde la base de datos
router.get('/obtenerAnios', (req, res) => {
    baseDeDatos.db.all('SELECT fecha FROM registros', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Error al obtener fechas' });
        } else {
            const fechas = rows.map(row => row.fecha);
            const aniosUnicos = obtenerAniosUnicosNuevoFormato(fechas);
            res.json(aniosUnicos); // Devuelve los años únicos en formato JSON
        }
    });
});

// Función para obtener años únicos desde fechas completas en JavaScript con nuevo formato
function obtenerAniosUnicosNuevoFormato(fechas) {
    const aniosUnicos = [...new Set(fechas.map(fecha => obtenerAnioNuevoFormato(fecha)))];
    return aniosUnicos;
}

// Función para obtener el año desde una fecha en formato nuevo (dd/mm/aaaa)
function obtenerAnioNuevoFormato(fecha) {
    const partesFecha = fecha.split('/');
    const anio = partesFecha[2];
    return parseInt(anio, 10); // Convierte el año a entero
}

// Ruta para filtrar registros según meses y años seleccionados
router.get('/filtrarRegistros', (req, res) => {
    const { meses, anios } = req.query;

    // Parsea los valores de meses y años desde JSON
    const mesesSeleccionados = JSON.parse(meses);
    const aniosSeleccionados = JSON.parse(anios);

    const sql_soloAnios = `
        SELECT *
        FROM registros
        WHERE fecha IS NOT NULL
            AND CAST(substr(fecha, -4) AS INTEGER) IN (${aniosSeleccionados})
    `;
    const sql_soloMeses = `
        SELECT *
        FROM registros
        WHERE fecha IS NOT NULL
            AND CAST(substr(fecha, 4, 2) AS INTEGER) IN (${mesesSeleccionados})
    `;
    const sql_completo = `
        SELECT *
        FROM registros
        WHERE fecha IS NOT NULL
            AND CAST(substr(fecha, -4) AS INTEGER) IN (${aniosSeleccionados})
            AND CAST(substr(fecha, 4, 2) AS INTEGER) IN (${mesesSeleccionados})
    `;

    var sql = sql_completo;
    // Lógica para filtrar registros en la base de datos según los meses y años seleccionados
    mesesSeleccionados.length === 0 ? sql = sql_soloAnios : (aniosSeleccionados.length === 0 ? sql = sql_soloMeses : sql = sql);

    baseDeDatos.db.all(sql, (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Error al realizar el filtrado' });
        } else {
            res.json(rows); // Devuelve los resultados del filtrado en formato JSON
        }
    });
});

router.get('/apagarServidor', (req, res) => {
    
    const nombreProceso = 'MiServidor';

    // Ejecuta el comando pm2 stop MiServidor sin abrir una ventana de comandos
    exec(`start /B pm2 stop ${nombreProceso}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al detener el proceso ${nombreProceso}: ${error}`);
            return res.status(500).json({ error: 'Error al detener el servidor' });
        }

        console.log(`Proceso ${nombreProceso} detenido con éxito.`);
        // Puedes manejar la respuesta si es necesario
    });
});

module.exports = router;