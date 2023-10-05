let estrucForm = "<div id='fila1'><div><label for='nomUs'>Nombre de usuario:</label><input type='text' name='nomUs' id='nomUs' maxlength='20' placeholder='Ingrese nombre de usuario' required></div><div><label for='numSol'>Número de solicitud:</label><input type='text' name='numSol' id='numSol' placeholder='Ingrese número de solicitud' required></div></div><div id='fila2'><div><label for='clavMues'>Clave de muestra:</label><input type='text' name='clavMues' id='clavMues' placeholder='Ingrese máximo 15 claves separados por coma' required></div><div><label for='fuenEmpl'>Fuentes empleadas:</label><input type='text' name='fuenEmpl' id='fuenEmpl' placeholder='Ingrese las fuentes empleadas' required></div></div><div id='fila3'><div><label for='durAn'>Duración del análisis:</label><input type='text' name='durAn' id='durAn' placeholder='HH : MM' required></div><div><label for='xfti'>Tiempo de vida de filamentos de rayos X (XFTI):</label><input type='text' name='xfti' id='xfti' placeholder='HH : MM' required></div><div><label for='presCam'>Presión en cámara de análisis (mbar):</label><input type='number' name='presCam' id='presCam' placeholder='Presión en mbar' required></div></div><div id='fila4'><label for='observaciones'>Observaciones y/o eventos:</label><textarea name='observaciones' id='observaciones' cols='30' rows='5' placeholder='En caso de haber comentarios, colocarlos aquí.'></textarea></div>";

function crearFormulario() {
    document.getElementById('formulario').innerHTML = '<form action="/crearRegistro" method="POST">' + estrucForm + '<button class="btn-registros" id="btn-crearR" type="submit">Crear nuevo registro</button></div></form>';
    validarFormatoTiempo();
}

function visFormulario() {
    document.getElementById("formulario").innerHTML = estrucForm;
    const coleccion = document.getElementsByTagName("input");
    document.getElementById("observaciones").borderStyle = "dashed";
    document.getElementById("observaciones").readOnly = "true";
    document.getElementById("observaciones").onmousedown = "return false";
    document.getElementById("observaciones").style.cursor = "default";
    for (var i = 0; i < coleccion.length; i++) {
        coleccion[i].style.borderStyle = "dashed";
        coleccion[i].readOnly = true;
        coleccion[i].onmousedown = "return false";
        coleccion[i].style.cursor = "default";
    }
    cargarDatos();
}


// Variables a usar: nomUs, numSol, clavMues, fuenEmpl, durAn, xfti, presCam, observaciones
// {"registro":{"id":2,"nombre_usuario":"2019630552-IsaacVB.-","num_solicitud":"Solicitud 1 + Solicitud2, detalles","clave_muestra":"Claves sin extensión","fuentes_empleadas":"Fuentes empleadas","duracion_analisis":"58:01","tiempo_vida_filamentos":"00:24","presion_camara_analisis":1000,"observaciones":"","fecha":"31/08/2023"}}

function cargarDatos() {
    // Recuperar datos del localStorage
    const datosLocalStorage = JSON.parse(localStorage.getItem('registroSeleccionado'));

    // Acceder a la propiedad "nombre_usuario" dentro del objeto "registro"
    const nomUs = datosLocalStorage.registro.nombre_usuario;
    const numSol = datosLocalStorage.registro.num_solicitud;
    const clavMues = datosLocalStorage.registro.clave_muestra;
    const fuenEmpl = datosLocalStorage.registro.fuentes_empleadas;
    const durAn = datosLocalStorage.registro.duracion_analisis;
    const xfti = datosLocalStorage.registro.tiempo_vida_filamentos;
    const presCam = datosLocalStorage.registro.presion_camara_analisis;
    const observaciones = datosLocalStorage.registro.observaciones;

    document.getElementById("nomUs").value = nomUs;
    document.getElementById("numSol").value = numSol;
    document.getElementById("clavMues").value = clavMues;
    document.getElementById("fuenEmpl").value = fuenEmpl;
    document.getElementById("durAn").value = durAn;
    document.getElementById("xfti").value = xfti;
    document.getElementById("presCam").value = presCam;
    document.getElementById("observaciones").value = observaciones;
}

function modificarFormulario() {
    document.getElementById('formulario').innerHTML = '<form action="/modificarRegistro" method="POST">' + estrucForm + '<button class="btn-registros" id="btn-crearR" type="submit">Modificar registro</button></div></form>';
    cargarDatos();
    validarFormatoTiempo();
}

function validarFormatoTiempo() {
    // Validación para duración del análisis
    // Expresión regular para validar el formato HH:MM y permitir solo números y ':'
    const formatoDurAn = /^(\d{1,3}):([0-5][0-9])$/;
    const duracionAnalisis = document.getElementById('durAn');
    duracionAnalisis.addEventListener('blur', function () {
        const valor = duracionAnalisis.value.trim();
        if (!formatoDurAn.test(valor)) {
            alert('Formato no válido para duración del análisis. Por favor, ingrese un tiempo válido en el formato HH:MM.\nValor máximo = 999:59\nValor mínimo: 0:01');
            duracionAnalisis.value = ''; // Limpia el campo
        }
    });

    // Validación para XFTI
    // Expresión regular para validar el formato HH:MM y permitir solo números y ':'
    const formatoValido = /^(\d{1,4}):([0-5][0-9])$/;
    const xfti = document.getElementById('xfti');
    xfti.addEventListener('blur', function () {
        const valor = xfti.value.trim();
        if (!formatoValido.test(valor)) {
            alert('Formato no válido para XFTI. Por favor, ingrese un tiempo válido en el formato HH:MM.\nValor máximo = 9999:59\nValor mínimo: 0:01');
            xfti.value = ''; // Limpia el campo
        }
    });
}