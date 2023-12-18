// ID de las etiquetas botón para estrucForm
const claves_idBotonMas = "botonMas_claves";
const duracionAnalisis_idBotonMas = "botonMas_duracionAnalisis";
const xfti_idBotonMas = "botonMas_xfti";
const presionCamara_idBotonMas = "botonMas_presionCamaras";

// ID de los input que manipulan listas
const claves_idInput = "clavMues";
const durAn_idInput = "durAn";
const xfti_idInput = "xfti";
const presCam_idInput = "presCam";

// Cantidad de columnas para cada campo de entrada de la fila 2
const columnasClaves = 1;
const columnasDurAn = 3;
const columnasXFTI = columnasDurAn;
const columnasPresCam = 3;
// console.log(columnasClaves, columnasDurAn, columnasXFTI, columnasPresCam);

const claves_placeholder = 'Agregue claves y presione +';
const tiempo_placeholder = 'HH : MM';
const presionCamara_placeholder = 'Presión en mbar';

const er_durAr = /^(\d{1,3}):([0-5][0-9])$/;
const er_xfti = /^(\d{1,4}):([0-5][0-9])$/;

//Tiempo de vida de filamentos de rayos X (XFTI) [horas]:
const estrucForm = "<div id='fila1' class='filas'><div><label for='numSol'>Número de solicitud:</label><input type='text' name='numSol' id='numSol' placeholder='Ingrese número de solicitud' required maxlength='15' autocomplete='off'></div><div><label for='nomUs'>Nombre de usuario:</label><input type='text' name='nomUs' id='nomUs' maxlength='100' placeholder='Ingrese nombre de usuario' required></div><div><label for='fuenEmpl'>Fuentes empleadas:</label><input type='text' name='fuenEmpl' id='fuenEmpl' placeholder='Ingrese las fuentes empleadas' required maxlength='50'></div></div><div id='fila2' class='filas'><div id='divClavMues'><label for='" + claves_idInput + "'>Claves de muestra:</label><input type='text' name='" + claves_idInput + "' id='" + claves_idInput + "' maxlength='15' placeholder='" + claves_placeholder + "' autocomplete='off'><button class='botonMas' id='" + claves_idBotonMas + "' type='button'>+</button><ul id='claveList' style='column-count:" + columnasClaves + "'></ul></div><div id='divDurAn'><label for='" + durAn_idInput + "'>Duración del análisis [horas]:</label><input type='text' name='" + durAn_idInput + "' id='" + durAn_idInput + "' placeholder='" + tiempo_placeholder + "' maxlength='6' autocomplete='off'><button class='botonMas' id='" + duracionAnalisis_idBotonMas + "' type='button'>+</button><ul id='duracionList' style='column-count:" + columnasDurAn + "'></ul></div><div id='divXFTI'><label for='" + xfti_idInput + "'>XFTI [horas]:</label><input type='text' name='" + xfti_idInput + "' id='" + xfti_idInput + "' placeholder='" + tiempo_placeholder + "' maxlength='7' autocomplete='off'><button class='botonMas' id='" + xfti_idBotonMas + "' type='button'>+</button><ul id='xfti_list' style='column-count:" + columnasXFTI + "'></ul></div><div id='divPresCam'><label for='" + presCam_idInput + "'>Presión en cámara de análisis [mbar]:</label><input type='text' name='" + presCam_idInput + "' id='" + presCam_idInput + "' placeholder='" + presionCamara_placeholder + "' maxlength='10' autocomplete='off'><button class='botonMas' id='" + presionCamara_idBotonMas + "' type='button'>+</button><ul id='presionCamara_list' style='column-count:" + columnasPresCam + "'></ul></div></div><div id='fila3' class='filas'><label for='observaciones'>Observaciones y/o eventos:</label><textarea name='observaciones' id='observaciones' cols='30' rows='5' placeholder='En caso de haber comentarios, colocarlos aquí.' maxlength='600'></textarea></div><div id='fila4' class='filas'><div><label for='diamHaz'>Diámetro del haz de Rayos X [micras^2]:</label><input type='text' name='diamHaz' id='diamHaz' placeholder='Diámetro en micras^2' required maxlength='10'></div><div><label for='precamara'>Precámara [horas]:</label><input type='text' name='precamara' id='precamara' placeholder='Precámara en horas' required maxlength='7'></div><div><label for='camAnalisis'>Cámara de análisis [horas]:</label><input type='text' name='camAnalisis' id='camAnalisis' placeholder='Cámara de análisis en horas' required maxlength='7'></div></div>";

const estrucFecha = '<p>Fecha:&nbsp</p><p id="obtenerFecha">';

const clavesMuestra = [];
const duracionAnalisis = ["00:00"];
const xfti = [];
const presionCamara = [];

let clavesMuestra_indice = 1;
let duracionAnalisis_indice = 0;
let xfti_indice = 1;
let presionCamara_indice = 1;

const clavesMuestra_maximo = 10;
const duracionAnalisis_maximo = 30;
const xfti_maximo = 30;
const presionCamara_maximo = 30;

// Prototipo de nueva función para botón más:
// function botonMas(inputObjetivo, arreglo, número máximo de registros)

function botonMas(arreglo, id, numeroIndice, numeroMaximoDeElementos, numeroColumnas) {
    const divPadre = document.getElementById(id).parentNode;
    const input = divPadre.querySelector("input");
    let valorInput = input.value.trim();
    if(valorInput){
        input.required = false;
        arreglo.push(valorInput);
        input.value = '';
        const lista = divPadre.querySelector("ul");
        mostrarLista(arreglo, lista, numeroColumnas);
        if(arreglo.length >= numeroMaximoDeElementos){
            input.readOnly = true;
            input.placeholder = 'Superó el límite: ' + (arreglo === duracionAnalisis ? numeroMaximoDeElementos-1 : numeroMaximoDeElementos);
            input.style.cursor = 'default';
        }
    }
    input.focus();
}

function mostrarLista(arreglo, listaUl, numeroColumnas){
    listaUl.innerHTML = '';
    const arregloCero = arreglo[0] === '00:00' ? true : false;
    listaUl.style.columnCount = numeroColumnas;
    listaUl.style.display = 'block';
    listaUl.style.flexWrap = 'wrap';
    for(let i=0; i<arreglo.length; i++){
        const elementoLi = document.createElement("li");
        const span = document.createElement("span");
        const parrafo = document.createElement("p");
        parrafo.style.width = '15ch';
        parrafo.textContent = arreglo[i];
        if(arreglo !== duracionAnalisis){
            span.innerHTML = (i+1)+') ';
        } else{
            if(!(arreglo[i] === '00:00')){
                span.innerHTML = i + ') ';
            }
        }
        elementoLi.appendChild(span);
        elementoLi.appendChild(parrafo);
        listaUl.style.position = "block";
        elementoLi.style.position = "block";

        const botonModificar = document.createElement('button');
        botonModificar.textContent = "M";
        botonModificar.addEventListener('click', function (event){
            modificarElemento(arreglo, i, parrafo, event);
        });

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = "E";
        botonEliminar.addEventListener('click', function () {
            eliminarElemento(arreglo, i, elementoLi, listaUl, numeroColumnas);
        });

        if(!(arreglo[i] === '00:00')){
            elementoLi.appendChild(botonModificar);
            elementoLi.appendChild(botonEliminar);
        }
        listaUl.appendChild(elementoLi);
        // Ajusta la posición vertical de los elementos nuevos
        const newElementPosition = listaUl.childElementCount * 20 + 'px';
        elementoLi.style.top = newElementPosition;
    }
}

function modificarElemento(arreglo, indice, parrafo, event){
    const nuevoContenido = prompt('Ingrese el nuevo contenido:');
    const input = parrafo.parentNode.parentNode.previousElementSibling.previousElementSibling;
    if(nuevoContenido !== null){
        if(arreglo === duracionAnalisis || arreglo === xfti){
            if(validarTiempoModificado(nuevoContenido, arreglo)){
                arreglo[indice] = nuevoContenido;
                parrafo.textContent = nuevoContenido;
                event.preventDefault();
                input.focus();
            } else{
                modificarElemento(arreglo, indice, parrafo);
            }
        }
    }
}

function validarTiempoModificado(contenido, arreglo){
    if(arreglo = duracionAnalisis){
        if(!er_durAr.test(contenido) && contenido !== ''){
            alert("Formato no válido. Ingrese un tiempo de forma correcta.");
            return false;
        }
    }

    return true;
}

function eliminarElemento(arreglo, indice, elementoLi, listaUl, numeroColumnas){
    arreglo.splice(indice, 1);
    elementoLi.remove();
    const input = listaUl.previousElementSibling.previousElementSibling;
    if(arreglo === clavesMuestra){
        input.placeholder = claves_placeholder;
    }
    if(arreglo === duracionAnalisis){
        input.placeholder = tiempo_placeholder;
        if(arreglo.length === 1){
            input.required = true;
        }
    }
    if(arreglo === xfti){
        input.placeholder = tiempo_placeholder;
    }
    if(arreglo === presionCamara){
        input.placeholder = presionCamara_placeholder;
    }
    input.readOnly = false;
    input.style.cursor = 'text';
    mostrarLista(arreglo, listaUl, numeroColumnas);
}

function agregarFecha(){
    document.getElementById("fechaMostrada").innerHTML = estrucFecha;
}

function validarClaves() {
    const clavMuesInput = document.getElementById(claves_idInput);
    const durAnInput = document.getElementById(durAn_idInput);
    const xftiInput = document.getElementById(xfti_idInput);
    const presCamInput = document.getElementById(presCam_idInput);
    //const claveList = document.getElementById('claveList');
    let arreglo_claves = [];
    let arreglo_duracion = [];
    let arreglo_xfti = [];
    let arreglo_presion = [];
    if(rutaActual === "/crearRegistro"){
        arreglo_claves = clavesMuestra;
        arreglo_duracion = duracionAnalisis;
        arreglo_xfti = xfti;
        arreglo_presion = presionCamara;
    } else if(rutaActual === "/modificarRegistro"){
        arreglo_claves = clavesAModificar;
        arreglo_duracion = duracionAnalisisAModificar;
        arreglo_xfti = xftiAModificar;
        arreglo_presion = presionAModificar;
    }
    if (arreglo_claves.length === 0) {
        alert("Ingrese al menos una clave de muestra, asegúrese de dar clic en su correspondiente botón '+'.");
        clavMuesInput.focus(); // Establece el foco en el campo "clavMues"
        return false; // Evita el envío del formulario
    }
    if (arreglo_duracion.length === 0) {
        alert("Ingrese al menos un valor de duración del análisis, asegúrese de dar clic en su correspondiente botón '+'.");
        durAnInput.focus(); // Establece el foco en el campo "durAn"
        return false; // Evita el envío del formulario
    }
    if (arreglo_xfti.length === 0) {
        alert("Ingrese al menos un valor de tiempo de vida de filamentos de rayos X, asegúrese de dar clic en su correspondiente botón '+'.");
        xftiInput.focus(); // Establece el foco en el campo "xfti"
        return false; // Evita el envío del formulario
    }
    if (arreglo_presion.length === 0) {
        alert("Ingrese al menos un valor de presión en cámara de análisis, asegúrese de dar clic en su correspondiente botón '+'.");
        presCamInput.focus(); // Establece el foco en el campo "presCam"
        return false; // Evita el envío del formulario
    }
    clavMuesInput.blur();
    durAnInput.blur();
    xftiInput.blur();
    presCamInput.blur();
    clavMuesInput.value = arreglo_claves;
    durAnInput.value = arreglo_duracion;
    xftiInput.value = arreglo_xfti;
    presCamInput.value = arreglo_presion;
    return true; // Permite el envío del formulario
    //claveList.style.display = 'none'; // Oculta claveList cuando el input pierde el foco
}
/**
 
function clavesPierdeFocus() {
    if(rutaActual === "/crearRegistro"){
        arreglo = clavesMuestra;
    } else if(rutaActual === "/modificarRegistro"){
        arreglo = clavesAModificar;
    }
    const inputs = document.querySelectorAll('input'); // Obtener todos los inputs

    const clavMuesInput = document.getElementById('clavMues');
    const claveList = document.getElementById('claveList');

    clavMuesInput.addEventListener('blur', function () {
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
              if (input.id !== 'clavMues') {
                // Este input tiene foco y no es el input con id "in2"
                clavMuesInput.value = arreglo;
                claveList.style.display = 'none'; // Oculta claveList cuando el input pierde el foco
              }
            });
          });
    });

    clavMuesInput.addEventListener('focus', function () {
        clavMuesInput.value = '';
        if (arreglo.length > 0) {
            claveList.style.display = 'block'; // Muestra claveList si hay elementos en el arreglo
        } else {
            claveList.style.display = 'none'; // Oculta claveList si el arreglo está vacío
        }
    });
}
 */

function crearFormulario() {
    document.getElementById('formulario').innerHTML = '<form action="/crearRegistro" method="POST" onsubmit="return validarClaves()">' + estrucForm + '<button class="btn-registros" id="btn-crearR" type="submit">Crear nuevo registro</button></form>';
    asignarFuncion_botonMas(claves_idBotonMas, clavesMuestra, clavesMuestra_indice, clavesMuestra_maximo, columnasClaves);
    asignarFuncion_botonMas(duracionAnalisis_idBotonMas, duracionAnalisis, duracionAnalisis_indice, duracionAnalisis_maximo+1, columnasDurAn);
    asignarFuncion_botonMas(xfti_idBotonMas, xfti, xfti_indice, xfti_maximo, columnasXFTI);
    asignarFuncion_botonMas(presionCamara_idBotonMas, presionCamara, presionCamara_indice, presionCamara_maximo, columnasPresCam);
    //document.getElementById("claveList").style.display = "none";
    //clavesPierdeFocus();
    validarFormatoTiempo();
}

function asignarFuncion_botonMas(id, arreglo, numeroDeIndice, numeroMaximoDeElementos){
    var divContenedor = document.getElementById(id).parentNode;
    // Obtener el input dentro del div contenedor
    var inputObjetivo = divContenedor.querySelector('input');
    document.getElementById(id).onclick = function() {
        var valorInput = inputObjetivo.value;
        botonMas(arreglo, id, numeroDeIndice, numeroMaximoDeElementos);
        if(valorInput != ''){
            numeroDeIndice++;
        }
    };
    inputObjetivo.required = true;
}

// Variables a usar: nomUs, numSol, clavMues, fuenEmpl, durAn, xfti, presCam, observaciones
// {"registro":{"id":2,"nombre_usuario":"2019630552-IsaacVB.-","num_solicitud":"Solicitud 1 + Solicitud2, detalles","clave_muestra":"Claves sin extensión","fuentes_empleadas":"Fuentes empleadas","duracion_analisis":"58:01","tiempo_vida_filamentos":"00:24","presion_camara_analisis":1000,"observaciones":"","fecha":"31/08/2023"}}

//<div id='fila4' class='filas'><div><label for='diamHaz'>Diámetro del haz de Rayos X [micras^2]:</label><input type='text' name='diamHaz' id='diamHaz' placeholder='Diámetro en micras^2' required maxlength='10'></div><div><label for='precamara'>Precámara [horas]:</label><input type='text' name='precamara' id='precamara' placeholder='Precámara en horas' required maxlength='7'></div><div><label for='camAnalisis'>Cámara de análisis [horas]:</label><input type='text' name='camAnalisis' id='camAnalisis' placeholder='Cámara de análisis en horas' required maxlength='7'></div></div>"

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
    const diamHaz = datosLocalStorage.registro.diametro_haz;
    const precamara = datosLocalStorage.registro.precamara;
    const camAnalisis = datosLocalStorage.registro.camara;

    document.getElementById("nomUs").value = nomUs;
    document.getElementById("numSol").value = numSol;
    document.getElementById("fuenEmpl").value = fuenEmpl;
    document.getElementById("observaciones").value = observaciones;
    document.getElementById("obtenerFecha").innerHTML = fecha;
    document.getElementById("diamHaz").value = diamHaz;
    document.getElementById("precamara").value = precamara;
    document.getElementById("camAnalisis").value = camAnalisis;
    crearLista(clavMues, claves_idInput);
    crearLista(durAn, durAn_idInput);
    crearLista(xfti, xfti_idInput);
    crearLista(presCam, presCam_idInput);
}

function crearLista(listaEnComas, inputID){
    let lista = listaEnComas.split(',');
    // Obtener el div contenedor usando el ID del botón
    var divContenedor = document.getElementById(inputID).parentNode;
    if(rutaActual === '/visualizarRegistro'){
        const inputADesaparecer = document.getElementById(inputID);
        inputADesaparecer.style.display = "none";
        divContenedor.querySelector('label').style.marginBottom = '10px';
    }

    // Obtener el input dentro del div contenedor
    var inputObjetivo = divContenedor.querySelector('input');
    // Obtener el ul dentro del div contenedor
    var ulListaObjetivo = divContenedor.querySelector('ul');
    var id_inputObjetivo = inputObjetivo.id;
    var id_ulListaObjetivo = ulListaObjetivo.id;
    const claveInput = document.getElementById(id_inputObjetivo);
    const claveList = document.getElementById(id_ulListaObjetivo);

    claveInput.value = '';
    for(let numeroIndice = 1; numeroIndice < lista.length + 1; numeroIndice++){
        //const indiceClave = arreglo.indexOf(ingresarAlArreglo);
        claveList.style.display = "block";
        // Crea un nuevo elemento de lista
        const listItem = document.createElement('li');
        // Inserta el número de índice al elemento
        const spanList = document.createElement('span');
        spanList.textContent = numeroIndice + ')';
        // Crea un párrafo que contendrá la información del elemento
        const parrafoList = document.createElement('p');
        parrafoList.style.width = "15ch";
        parrafoList.textContent = lista[numeroIndice-1];
        // Agrega el número de índice al elemento de la lista
        listItem.append(spanList);
        // Agrega el párrafo al elemento de la lista
        listItem.appendChild(parrafoList);
        // Configura la posición de los elementos como "block" para visualizarlos
        listItem.style.position = 'block';
        // Añade el elemento de lista a la lista de claves
        claveList.appendChild(listItem);
        // Ajusta la posición vertical de los elementos nuevos
        const newElementPosition = claveList.childElementCount * 20 + 'px';
        listItem.style.top = newElementPosition;
        // Borra el campo de entrada de la clave
        claveInput.value = '';
        // Asegura que la lista tenga una altura máxima de 50px y habilite el scroll si es necesario
        claveList.style.maxHeight = '100%';
        // claveList.style.overflowY = 'auto';
    }
}

function validarFormatoTiempo() {
    // Validación para duración del análisis
    // Expresión regular para validar el formato HH:MM y permitir solo números y ':'
    const formatoDurAn = er_durAr;
    const duracionAnalisis = document.getElementById(durAn_idInput);
    duracionAnalisis.addEventListener('blur', function () {
        const valor = duracionAnalisis.value.trim();
        if (!formatoDurAn.test(valor) && duracionAnalisis.value != '') {
            alert('Formato no válido para duración del análisis. Por favor, ingrese un tiempo válido en el formato HH:MM.\nValor máximo = 999:59\nValor mínimo: 0:01');
            duracionAnalisis.value = ''; // Limpia el campo
            document.getElementById('version').click(); // Simula un clic fuera de las etiquetas input para que no haya un bug en mostrar un mensaje de error si el formato de tiempo no es válido
            duracionAnalisis.focus();
        }
    });

    // Validación para XFTI
    // Expresión regular para validar el formato HH:MM y permitir solo números y ':'
    const formatoValido = er_xfti;
    const xfti = document.getElementById(xfti_idInput);
    xfti.addEventListener('blur', function () {
        const valor = xfti.value.trim();
        if (!formatoValido.test(valor) && xfti.value != '') {
            alert('Formato no válido para XFTI. Por favor, ingrese un tiempo válido en el formato HH:MM.\nValor máximo = 9999:59\nValor mínimo: 0:01');
            xfti.value = ''; // Limpia el campo
            document.getElementById('version').click(); // Simula un clic fuera de las etiquetas input para que no haya un bug en mostrar un mensaje de error si el formato de tiempo no es válido
            xfti.focus();
        }
    });
}