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
const columnasDurAn = 2;
const columnasXFTI = 3;
const columnasPresCam = 3;
// console.log(columnasClaves, columnasDurAn, columnasXFTI, columnasPresCam);

const claves_placeholder = 'Agregue claves y presione +';
const tiempo_placeholder = 'HH : MM';
const presionCamara_placeholder = 'Presión en mbar';

const er_durAr = /^(\d{1,3}):([0-5][0-9])$/;
const er_xfti = /^(\d{1,4}):([0-5][0-9])$/;

//Tiempo de vida de filamentos de rayos X (XFTI) [horas]:
const estrucForm = "<div id='fila1' class='filas'><div><label for='numSol'>Número de solicitud:</label><input type='text' name='numSol' id='numSol' placeholder='Ingrese número de solicitud' required maxlength='15' autocomplete='off'></div><div><label for='nomUs'>Nombre de usuario:</label><input type='text' name='nomUs' id='nomUs' maxlength='100' placeholder='Ingrese nombre de usuario' required></div><div><label for='fuenEmpl'>Fuentes empleadas:</label><input type='text' name='fuenEmpl' id='fuenEmpl' placeholder='Ingrese las fuentes empleadas' required maxlength='50'></div></div><div id='fila2' class='filas'><div id='divClavMues'><label for='" + claves_idInput + "'>Claves de muestra:</label><input type='text' name='" + claves_idInput + "' id='" + claves_idInput + "' maxlength='30' placeholder='" + claves_placeholder + "' autocomplete='off'><button class='botonMas' id='" + claves_idBotonMas + "' type='button'>+</button><ul id='claveList' style='column-count:" + columnasClaves + "'></ul></div><div id='divDurAn'><label for='" + durAn_idInput + "'>Duración del análisis [horas]:</label><input type='text' name='" + durAn_idInput + "' id='" + durAn_idInput + "' placeholder='" + tiempo_placeholder + "' maxlength='6' autocomplete='off'><button class='botonMas' id='" + duracionAnalisis_idBotonMas + "' type='button'>+</button><ul id='duracionList' style='column-count:" + columnasDurAn + "'></ul></div><div id='divXFTI'><label for='" + xfti_idInput + "'>XFTI [horas]:</label><input type='text' name='" + xfti_idInput + "' id='" + xfti_idInput + "' placeholder='" + tiempo_placeholder + "' maxlength='7' autocomplete='off'><button class='botonMas' id='" + xfti_idBotonMas + "' type='button'>+</button><ul id='xfti_list' style='column-count:" + columnasXFTI + "'></ul></div><div id='divPresCam'><label for='" + presCam_idInput + "'>Presión en cámara de análisis [mbar]:</label><input type='text' name='" + presCam_idInput + "' id='" + presCam_idInput + "' placeholder='" + presionCamara_placeholder + "' maxlength='10' autocomplete='off'><button class='botonMas' id='" + presionCamara_idBotonMas + "' type='button'>+</button><ul id='presionCamara_list' style='column-count:" + columnasPresCam + "'></ul></div></div><div id='fila3' class='filas'><label for='observaciones'>Observaciones y/o eventos:</label><textarea name='observaciones' id='observaciones' cols='30' rows='5' placeholder='En caso de haber comentarios, colocarlos aquí.' maxlength='600'></textarea></div><div id='fila4' class='filas'><div><label for='diamHaz'>Diámetro del haz de Rayos X [micras^2]:</label><input type='text' name='diamHaz' id='diamHaz' placeholder='Diámetro en micras^2' required maxlength='10'></div><div><label for='precamara'>Precámara [horas]:</label><input type='text' name='precamara' id='precamara' placeholder='Precámara en horas' required maxlength='7'></div><div><label for='camAnalisis'>Cámara de análisis [horas]:</label><input type='text' name='camAnalisis' id='camAnalisis' placeholder='Cámara de análisis en horas' required maxlength='7'></div></div>";

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

function botonMas(arreglo, id, numeroMaximoDeElementos, numeroColumnas) {
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

function mostrarLista(arreglo, listaUl, numeroColumnas) {
    listaUl.innerHTML = '';
    listaUl.style.columnCount = numeroColumnas;
    listaUl.style.display = 'block';
    listaUl.style.flexWrap = 'wrap';

    const elementosPorColumna = Math.ceil(arreglo.length / numeroColumnas);
    for (let i = 0; i < arreglo.length; i++) {
        const elementoLi = document.createElement("li");
        const span = document.createElement("span");
        const parrafo = document.createElement("p");
        arreglo === presionCamara ? parrafo.style.width = '11ch' : parrafo.style.width = '10ch';
        if(arreglo === clavesMuestra) parrafo.style.width = '30ch';
        parrafo.textContent = arreglo[i];
        span.innerHTML = (i + 1) + ') ';
        elementoLi.appendChild(span);
        elementoLi.appendChild(parrafo);

        const botonModificar = document.createElement('button');
        botonModificar.textContent = "M";
        botonModificar.addEventListener('click', function (event) {
            event.preventDefault();
            modificarElemento(arreglo, i, parrafo, event);
        });

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = "E";
        botonEliminar.addEventListener('click', function () {
            eliminarElemento(arreglo, i, elementoLi, listaUl, numeroColumnas);
        });

        if (!(arreglo[i] === '00:00')) {
            elementoLi.appendChild(botonModificar);
            elementoLi.appendChild(botonEliminar);
        }
        listaUl.appendChild(elementoLi);

        // Ajusta la posición vertical de los elementos nuevos
        const newElementPosition = (i % elementosPorColumna) * 20 + 'px';
        elementoLi.style.top = newElementPosition;
    }
}


function modificarElemento(arreglo, indice, parrafo, event){
    const nuevoContenido = prompt('Ingrese el nuevo contenido:', parrafo.textContent);
    const input = parrafo.parentNode.parentNode.previousElementSibling.previousElementSibling;
    if(nuevoContenido !== null){
        arreglo[indice] = nuevoContenido;
        parrafo.textContent = nuevoContenido;
        if(arreglo === duracionAnalisis || arreglo === xfti){
            if(validarTiempoModificado(nuevoContenido, arreglo)){
                event.preventDefault();
                input.focus();
            } else{
                modificarElemento(arreglo, indice, parrafo);
            }
        }
    }
}

function validarTiempoModificado(contenido, arreglo){
    if(arreglo === duracionAnalisis){
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
    if (arreglo_claves.length < 1) {
        alert("Ingrese al menos una clave de muestra, asegúrese de dar clic en su correspondiente botón '+' o dar Enter.");
        clavMuesInput.focus(); // Establece el foco en el campo "clavMues"
        return false; // Evita el envío del formulario
    }
    if (arreglo_duracion.length < 2) {
        alert("Ingrese al menos un valor de duración del análisis, asegúrese de dar clic en su correspondiente botón '+' o dar Enter.");
        durAnInput.focus(); // Establece el foco en el campo "durAn"
        return false; // Evita el envío del formulario
    }
    if (arreglo_xfti.length < 1) {
        alert("Ingrese al menos un valor de tiempo de vida de filamentos de rayos X, asegúrese de dar clic en su correspondiente botón '+' o dar Enter.");
        xftiInput.focus(); // Establece el foco en el campo "xfti"
        return false; // Evita el envío del formulario
    }
    if (arreglo_presion.length < 1) {
        alert("Ingrese al menos un valor de presión en cámara de análisis, asegúrese de dar clic en su correspondiente botón '+' o dar Enter.");
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

function crearFormulario() {
    document.getElementById('formulario').innerHTML = '<form id="formCrear" action="/crearRegistro" method="POST" onsubmit="return validarClaves()">' + estrucForm + '<button class="btn-registros" id="btn-crearR" type="submit">Crear nuevo registro</button></form>';
    asignarFuncion_botonMas(claves_idBotonMas, clavesMuestra, clavesMuestra_maximo, columnasClaves);
    asignarFuncion_botonMas(duracionAnalisis_idBotonMas, duracionAnalisis, duracionAnalisis_maximo+1, columnasDurAn);
    asignarFuncion_botonMas(xfti_idBotonMas, xfti, xfti_maximo, columnasXFTI);
    asignarFuncion_botonMas(presionCamara_idBotonMas, presionCamara, presionCamara_maximo, columnasPresCam);
    validarFormatoTiempo();
    interaccionCamposDeLista();
    const inputDurAn = document.getElementById(durAn_idInput);
    const inputXFTI = document.getElementById(xfti_idInput);
    const inputPrecamara = document.getElementById('precamara');
    const inputCamara = document.getElementById('camAnalisis');
    const inputNumSol = document.getElementById('numSol');
    const inputNomUs = document.getElementById('nomUs');
    const inputFuenEmpl = document.getElementById('fuenEmpl');
    const inputDiamHaz = document.getElementById('diamHaz');
    const arregloInputs = [];
    arregloInputs.push(inputPrecamara, inputCamara, inputNumSol, inputNomUs, inputFuenEmpl, inputDiamHaz);
    arregloInputs.forEach(input => {
        input.addEventListener('keydown', function (event) {
            if(event.key === 'Enter'){
                event.preventDefault();
                document.getElementById('btn-crearR').click();
            }
        });
    });

    inputDurAn.addEventListener('keydown', espacio);
    inputXFTI.addEventListener('keydown', espacio);
    inputPrecamara.addEventListener('keydown', espacio);
    inputCamara.addEventListener('keydown', espacio);
}

function espacio(event) {
    const keyCode = event.keyCode || event.which;
    if (keyCode === 32) {
        event.preventDefault();
        const contenidoActualInput = this.value.trim();
        if (!contenidoActualInput.includes(':')) {
            event.preventDefault();
            this.value = contenidoActualInput + ':';
        }
    }
}

function asignarFuncion_botonMas(id, arreglo, numeroMaximoDeElementos, numeroCols){
    var divContenedor = document.getElementById(id).parentNode;
    // Obtener el input dentro del div contenedor
    var inputObjetivo = divContenedor.querySelector('input');
    document.getElementById(id).onclick = function() {
        botonMas(arreglo, id, numeroMaximoDeElementos, numeroCols);
    };
    inputObjetivo.required = true;
}

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

// La siguiente función permite que haya una mejor UX, ya que, al dar clic en el botón tabulador cuando el usuario se encuentre en un input que maneje listas, se le dirigirá al siguiente input. Si da clic en Enter, se añadirá lo escrito a su lista correspondiente.
function interaccionCamposDeLista() {
    const listas = document.querySelectorAll('ul');
    const ids_inputListas = [];

    listas.forEach(lista => {
        const inputsNodeList = lista.parentElement.querySelectorAll('input');
        const inputsArray = Array.from(inputsNodeList);

        inputsArray.forEach(input => {
            ids_inputListas.push(input.id);
        });

        inputsArray.forEach(input => {
            const indiceInput = ids_inputListas.indexOf(input.id);
            input.addEventListener('keydown', (event) => {
                if(event.key === 'Tab' && !event.shiftKey){
                    event.preventDefault();
                    if(indiceInput != (ids_inputListas.length - 1)){
                        const siguienteIndice = indiceInput + 1;
                        nombreSiguienteInput = ids_inputListas[siguienteIndice];
                        document.getElementById(nombreSiguienteInput).focus();
                    }else{
                        document.getElementById('observaciones').focus();
                    }
                }else if(event.key === 'Tab' && event.shiftKey){
                    event.preventDefault();
                    if (indiceInput > 0) {
                        const anteriorIndice = indiceInput - 1;
                        const nombreAnteriorInput = ids_inputListas[anteriorIndice];
                        document.getElementById(nombreAnteriorInput).focus();
                    }else{
                        document.getElementById('fuenEmpl').focus();
                    }
                }
                if(event.key === 'Enter'){
                    let botonMas;
                    event.preventDefault();
                    if(input.id === ids_inputListas[0]) botonMas = document.getElementById(claves_idBotonMas);
                    if(input.id === ids_inputListas[1]){
                        botonMas = document.getElementById(duracionAnalisis_idBotonMas);
                        const formatoDurAn = er_durAr;
                        const duracionAnalisis = document.getElementById(durAn_idInput);
                        const valor = duracionAnalisis.value.trim();
                        if (!formatoDurAn.test(valor) && duracionAnalisis.value != '') {
                            alert('Formato no válido para duración del análisis. Por favor, ingrese un tiempo válido en el formato HH:MM.\nValor máximo = 999:59\nValor mínimo: 0:01');
                            duracionAnalisis.value = ''; // Limpia el campo
                            document.getElementById('version').click(); // Simula un clic fuera de las etiquetas input para que no haya un bug en mostrar un mensaje de error si el formato de tiempo no es válido
                            duracionAnalisis.focus();
                        }
                    }
                    if(input.id === ids_inputListas[2]){
                        botonMas = document.getElementById(xfti_idBotonMas);
                        const formatoValido = er_xfti;
                        const xfti = document.getElementById(xfti_idInput);
                        const valor = xfti.value.trim();
                        if (!formatoValido.test(valor) && xfti.value != '') {
                            alert('Formato no válido para XFTI. Por favor, ingrese un tiempo válido en el formato HH:MM.\nValor máximo = 9999:59\nValor mínimo: 0:01');
                            xfti.value = ''; // Limpia el campo
                            document.getElementById('version').click(); // Simula un clic fuera de las etiquetas input para que no haya un bug en mostrar un mensaje de error si el formato de tiempo no es válido
                            xfti.focus();
                        }
                    }
                    if(input.id === ids_inputListas[3]) botonMas = document.getElementById(presionCamara_idBotonMas);
                    botonMas.click();
                }
            });
        });
    });
    const botonesFormulario = document.querySelectorAll('button');
    const botonesArray = Array.from(botonesFormulario);
    const tamArregloBotones = botonesArray.length;
    document.getElementById('diamHaz').addEventListener('keydown', event => {
        if(event.key === 'Enter'){
            event.preventDefault();
            botonesArray[tamArregloBotones-1].click();  // Clic en el botón para crear o modificar registro
        }
    });
    document.getElementById('precamara').addEventListener('keydown', event => {
        if(event.key === 'Enter'){
            event.preventDefault();
            botonesArray[tamArregloBotones-1].click();
        }
    });
    document.getElementById('camAnalisis').addEventListener('keydown', event => {
        if(event.key === 'Enter'){
            event.preventDefault();
            botonesArray[tamArregloBotones-1].click();
        }
    });
    document.getElementById('observaciones').addEventListener('keydown', (event) => {
        if(event.key === 'Tab' && event.shiftKey){
            event.preventDefault();
            document.getElementById('presCam').focus();
        }
    });
}

const mensajeSalida = '¿Realmente desea salir? \nAl confirmar, se perderán los datos modificados.';
function volver(){
    const inputs = document.querySelectorAll('input');
    const inputsArray = Array.from(inputs);
    let inputsVacios = true; // Por default, suponemos que están vacíos todos los inputs
    if(rutaActual === '/crearRegistro'){
        inputsArray.forEach(campo => {
            if(campo.value !== '') inputsVacios = false;
        });
        // Si inputsVacios = false, significa que al menos uno de ellos tiene datos
        if(!inputsVacios){
            const confirmacion = window.confirm(mensajeSalida);
            if(confirmacion == true) redirigirPantallaPrincipal();
        } else{
            redirigirPantallaPrincipal();
        }
    }else if(rutaActual === '/modificarRegistro'){
        const datos = JSON.parse(localStorage.getItem('registroSeleccionado'));
        const jsonDatos = datos.registro;
        let registrosIguales = true;    // Suponer que, por default, todos los inputs no fueron modificados
        const num_solicitud = document.getElementById('numSol').value;
        const nombre_usuario = document.getElementById('nomUs').value;
        const fuentes_empleadas = document.getElementById('fuenEmpl').value;
        const clave_muestra = recuperrarArregloDeLista('claveList');
        const duracion_analisis = recuperrarArregloDeLista('duracionList');
        const tiempo_vida_filamentos = recuperrarArregloDeLista('xfti_list');
        const presion_camara_analisis = recuperrarArregloDeLista('presionCamara_list');
        const observaciones = document.getElementById('observaciones').value;
        const diametro_haz = document.getElementById('diamHaz').value;
        const precamara = document.getElementById('precamara').value;
        const camara = document.getElementById('camAnalisis').value;

        if(jsonDatos.num_solicitud !== num_solicitud) registrosIguales = false;
        if(jsonDatos.nombre_usuario !== nombre_usuario) registrosIguales = false;
        if(jsonDatos.fuentes_empleadas !== fuentes_empleadas) registrosIguales = false;
        if(jsonDatos.clave_muestra !== clave_muestra) registrosIguales = false;
        if(jsonDatos.duracion_analisis !== duracion_analisis) registrosIguales = false;
        if(jsonDatos.tiempo_vida_filamentos !== tiempo_vida_filamentos) registrosIguales = false;
        if(jsonDatos.presion_camara_analisis !== presion_camara_analisis) registrosIguales = false;
        if(jsonDatos.observaciones !== observaciones) registrosIguales = false;
        if(jsonDatos.diametro_haz !== diametro_haz) registrosIguales = false;
        if(jsonDatos.precamara !== precamara) registrosIguales = false;
        if(jsonDatos.camara !== camara) registrosIguales = false;
        
        if(registrosIguales){
            redirigirPantallaPrincipal();
        }else{
            const confirmacion = window.confirm(mensajeSalida);
            if(confirmacion == true) redirigirPantallaPrincipal();
        }
    }
}

function redirigirPantallaPrincipal(){
    window.location.href = 'http://localhost:3000/';
}

function recuperrarArregloDeLista(idListaUL){
    const ul_clave = document.getElementById(idListaUL);
    const li_clave = ul_clave.querySelectorAll('li');
    const arreglo = [];
    // if(idListaUL === 'xfti_list') arreglo.push('00:00');
    li_clave.forEach(elementoLi => {
        const elementoP = elementoLi.querySelector('p');
        arreglo.push(elementoP.textContent);
    });
    const arregloConvertido = arreglo.join(',');
    return arregloConvertido;
}