let estrucForm = "<div id='fila1'><div><label for='nomUs'>Nombre de usuario:</label><input type='text' name='nomUs' id='nomUs' maxlength='100' placeholder='Ingrese nombre de usuario' required></div><div><label for='numSol'>Número de solicitud:</label><input type='text' name='numSol' id='numSol' placeholder='Ingrese número de solicitud' required></div></div><div id='fila2'><div><label for='clavMues'>Clave de muestra:</label><input type='text' name='clavMues' id='clavMues' maxlength='15' placeholder='Agregue claves y presione el botón +'><button class='botonMas' id='botonMas' type='button'>+</button><ul id='claveList'></ul></div><div><label for='fuenEmpl'>Fuentes empleadas:</label><input type='text' name='fuenEmpl' id='fuenEmpl' placeholder='Ingrese las fuentes empleadas' required></div></div><div id='fila3'><div><label for='durAn'>Duración del análisis:</label><input type='text' name='durAn' id='durAn' placeholder='HH : MM' required></div><div><label for='xfti'>Tiempo de vida de filamentos de rayos X (XFTI):</label><input type='text' name='xfti' id='xfti' placeholder='HH : MM' required></div><div><label for='presCam'>Presión en cámara de análisis (mbar):</label><input type='text' name='presCam' id='presCam' placeholder='Presión en mbar' required></div></div><div id='fila4'><label for='observaciones'>Observaciones y/o eventos:</label><textarea name='observaciones' id='observaciones' cols='30' rows='5' placeholder='En caso de haber comentarios, colocarlos aquí.'></textarea></div>";

let estrucFecha = '<p>Fecha:&nbsp</p><p id="obtenerFecha">';

const clavesMuestra = [];

function botonMas() {  
    const claveInput = document.getElementById('clavMues');
    const claveList = document.getElementById('claveList');

    // Obtiene el valor del campo de entrada de la clave
    const claveValue = claveInput.value;
    claveInput.value = '';

    // Verifica si se ha ingresado algo en el campo
    if (claveValue) { 
        console.log("Clave value: " + claveValue);      
        const ingresarAlArreglo = claveValue;
        clavesMuestra.push(ingresarAlArreglo);
        const indiceClave = clavesMuestra.indexOf(ingresarAlArreglo);
        claveList.style.display = "block";
        
        // Crea un nuevo elemento de lista
        const listItem = document.createElement('li');
        listItem.textContent = ingresarAlArreglo;
        console.log(ingresarAlArreglo);

        // Crea un botón de eliminación
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        
        // Agrega un controlador de eventos al botón de eliminación
        deleteButton.addEventListener('click', function () {
            claveList.removeChild(listItem);
            clavesMuestra.splice(indiceClave, 1);
            console.log(clavesMuestra);
            clavesMuestra.length === 0 ? document.getElementById("claveList").style.display = "none" : null;
        });

        // Agrega el botón de eliminación al elemento de lista
        listItem.appendChild(deleteButton);

        // Configura la posición de los elementos como "absolute" para superponerlos
        listItem.style.position = 'block';

        // Añade el elemento de lista a la lista de claves
        claveList.appendChild(listItem);

        // Ajusta la posición vertical de los elementos nuevos
        const newElementPosition = claveList.childElementCount * 20 + 'px';
        listItem.style.top = newElementPosition;

        // Borra el campo de entrada de la clave
        claveInput.value = '';

        // Asegura que la lista tenga una altura máxima de 50px y habilite el scroll si es necesario
        claveList.style.maxHeight = '50px';
        claveList.style.overflowY = 'auto';
        
        // Vuelve a enfocar el campo de entrada clavMues
        claveInput.focus();
    }
}

function agregarFecha(){
    document.getElementById("fechaMostrada").innerHTML = estrucFecha;
}

function validarClaves() {
    if (clavesMuestra.length === 0) {
        alert("Ingrese al menos una clave de muestra");
        document.getElementById('clavMues').focus(); // Establece el foco en el campo "clavMues"
        return false; // Evita el envío del formulario
    }
    document.getElementById('version').click(); // Simula un clic fuera de las etiquetas input para que no haya un bug en mostrar un mensaje de error si el formato de tiempo no es válido
    return true; // Permite el envío del formulario
}

function clavesPierdeFocus() {
    const inputs = document.querySelectorAll('input'); // Obtener todos los inputs

    const clavMuesInput = document.getElementById('clavMues');
    const claveList = document.getElementById('claveList');

    clavMuesInput.addEventListener('blur', function () {
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
              if (input.id !== 'clavMues') {
                // Este input tiene foco y no es el input con id "in2"
                clavMuesInput.value = clavesMuestra;
                claveList.style.display = 'none'; // Oculta claveList cuando el input pierde el foco
              }
            });
          });
    });

    clavMuesInput.addEventListener('focus', function () {
        clavMuesInput.value = '';
        if (clavesMuestra.length > 0) {
            claveList.style.display = 'block'; // Muestra claveList si hay elementos en el arreglo
        } else {
            claveList.style.display = 'none'; // Oculta claveList si el arreglo está vacío
        }
    });
}

function crearFormulario() {
    document.getElementById('formulario').innerHTML = '<form action="/crearRegistro" method="POST" onsubmit="return validarClaves()">' + estrucForm + '<button class="btn-registros" id="btn-crearR" type="submit">Crear nuevo registro</button></form>';
    document.getElementById("botonMas").onclick = botonMas;
    document.getElementById("claveList").style.display = "none";
    clavesPierdeFocus();
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
    document.getElementById("botonMas").style.display = "none";
    document.getElementById("claveList").style.display = "none";
    document.getElementById("clavMues").style.width = "100%";
    agregarFecha();
    cargarDatos();
}


// Variables a usar: nomUs, numSol, clavMues, fuenEmpl, durAn, xfti, presCam, observaciones
// {"registro":{"id":2,"nombre_usuario":"2019630552-IsaacVB.-","num_solicitud":"Solicitud 1 + Solicitud2, detalles","clave_muestra":"Claves sin extensión","fuentes_empleadas":"Fuentes empleadas","duracion_analisis":"58:01","tiempo_vida_filamentos":"00:24","presion_camara_analisis":1000,"observaciones":"","fecha":"31/08/2023"}}

function cargarDatos() {
    // Recuperar datos del localStorage
    const datosLocalStorage = JSON.parse(localStorage.getItem('registroSeleccionado'));
    // console.log(datosLocalStorage.registro);
    // Acceder a la propiedad "nombre_usuario" dentro del objeto "registro"
    const nomUs = datosLocalStorage.registro.nombre_usuario;
    const numSol = datosLocalStorage.registro.num_solicitud;
    const clavMues = datosLocalStorage.registro.clave_muestra;
    const fuenEmpl = datosLocalStorage.registro.fuentes_empleadas;
    const durAn = datosLocalStorage.registro.duracion_analisis;
    const xfti = datosLocalStorage.registro.tiempo_vida_filamentos;
    const presCam = datosLocalStorage.registro.presion_camara_analisis;
    const observaciones = datosLocalStorage.registro.observaciones;
    const fecha = datosLocalStorage.registro.fecha;

    document.getElementById("nomUs").value = nomUs;
    document.getElementById("numSol").value = numSol;
    document.getElementById("clavMues").value = clavMues;
    document.getElementById("fuenEmpl").value = fuenEmpl;
    document.getElementById("durAn").value = durAn;
    document.getElementById("xfti").value = xfti;
    document.getElementById("presCam").value = presCam;
    document.getElementById("observaciones").value = observaciones;
    document.getElementById("obtenerFecha").innerHTML = fecha;
}

function validarFormatoTiempo() {
    // Validación para duración del análisis
    // Expresión regular para validar el formato HH:MM y permitir solo números y ':'
    const formatoDurAn = /^(\d{1,3}):([0-5][0-9])$/;
    const duracionAnalisis = document.getElementById('durAn');
    duracionAnalisis.addEventListener('blur', function () {
        const valor = duracionAnalisis.value.trim();
        if (!formatoDurAn.test(valor) && duracionAnalisis.value != '') {
            alert('Formato no válido para duración del análisis. Por favor, ingrese un tiempo válido en el formato HH:MM.\nValor máximo = 999:59\nValor mínimo: 0:01');
            duracionAnalisis.value = ''; // Limpia el campo
            document.getElementById('version').click(); // Simula un clic fuera de las etiquetas input para que no haya un bug en mostrar un mensaje de error si el formato de tiempo no es válido
        }
    });

    // Validación para XFTI
    // Expresión regular para validar el formato HH:MM y permitir solo números y ':'
    const formatoValido = /^(\d{1,4}):([0-5][0-9])$/;
    const xfti = document.getElementById('xfti');
    xfti.addEventListener('blur', function () {
        const valor = xfti.value.trim();
        if (!formatoValido.test(valor) && xfti.value != '') {
            alert('Formato no válido para XFTI. Por favor, ingrese un tiempo válido en el formato HH:MM.\nValor máximo = 9999:59\nValor mínimo: 0:01');
            xfti.value = ''; // Limpia el campo
            document.getElementById('version').click(); // Simula un clic fuera de las etiquetas input para que no haya un bug en mostrar un mensaje de error si el formato de tiempo no es válido
        }
    });
}