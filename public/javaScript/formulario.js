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

//Tiempo de vida de filamentos de rayos X (XFTI) [horas]:
const estrucForm = "<div id='fila1' class='filas'><div><label for='numSol'>Número de solicitud:</label><input type='text' name='numSol' id='numSol' placeholder='Ingrese número de solicitud' required maxlength='15'></div><div><label for='nomUs'>Nombre de usuario:</label><input type='text' name='nomUs' id='nomUs' maxlength='100' placeholder='Ingrese nombre de usuario' required></div><div><label for='fuenEmpl'>Fuentes empleadas:</label><input type='text' name='fuenEmpl' id='fuenEmpl' placeholder='Ingrese las fuentes empleadas' required maxlength='50'></div></div><div id='fila2' class='filas'><div id='divClavMues'><label for='" + claves_idInput + "'>Claves de muestra:</label><input type='text' name='" + claves_idInput + "' id='" + claves_idInput + "' maxlength='15' placeholder='Agregue claves y presione +' autocomplete='off'><button class='botonMas' id='" + claves_idBotonMas + "' type='button'>+</button><ul id='claveList'></ul></div><div id='divDurAn'><label for='" + durAn_idInput + "'>Duración del análisis [horas]:</label><input type='text' name='" + durAn_idInput + "' id='" + durAn_idInput + "' placeholder='HH : MM' maxlength='6' autocomplete='off'><button class='botonMas' id='" + duracionAnalisis_idBotonMas + "' type='button'>+</button><ul id='duracionList'></ul></div><div id='divXFTI'><label for='" + xfti_idInput + "'>XFTI [horas]:</label><input type='text' name='" + xfti_idInput + "' id='" + xfti_idInput + "' placeholder='HH : MM' maxlength='7' autocomplete='off'><button class='botonMas' id='" + xfti_idBotonMas + "' type='button'>+</button><ul id='xfti_list'></ul></div><div id='divPresCam'><label for='" + presCam_idInput + "'>Presión en cámara de análisis [mbar]:</label><input type='text' name='" + presCam_idInput + "' id='" + presCam_idInput + "' placeholder='Presión en mbar' maxlength='10' autocomplete='off'><button class='botonMas' id='" + presionCamara_idBotonMas + "' type='button'>+</button><ul id='presionCamara_list'></ul></div></div><div id='fila3' class='filas'><label for='observaciones'>Observaciones y/o eventos:</label><textarea name='observaciones' id='observaciones' cols='30' rows='5' placeholder='En caso de haber comentarios, colocarlos aquí.' maxlength='600'></textarea></div><div id='fila4' class='filas'><div><label for='diamHaz'>Diámetro del haz de Rayos X [micras^2]:</label><input type='text' name='diamHaz' id='diamHaz' placeholder='Diámetro en micras^2' required maxlength='10'></div><div><label for='precamara'>Precámara [horas]:</label><input type='text' name='precamara' id='precamara' placeholder='Precámara en horas' required maxlength='7'></div><div><label for='camAnalisis'>Cámara de análisis [horas]:</label><input type='text' name='camAnalisis' id='camAnalisis' placeholder='Cámara de análisis en horas' required maxlength='7'></div></div>";

const estrucFecha = '<p>Fecha:&nbsp</p><p id="obtenerFecha">';

const clavesMuestra = [];
const duracionAnalisis = [];
const xfti = [];
const presionCamara = [];

let clavesMuestra_indice = 1;
let duracionAnalisis_indice = 1;
let xfti_indice = 1;
let presionCamara_indice = 1;

const clavesMuestra_maximo = 10;
const duracionAnalisis_maximo = 20;
const xfti_maximo = 20;
const presionCamara_maximo = 30;

// Prototipo de nueva función para botón más:
// function botonMas(inputObjetivo, arreglo, número máximo de registros)

function botonMas(arreglo, id, numeroIndice, numeroMaximoDeElementos) {
    // Obtener el div contenedor usando el ID del botón
    var divContenedor = document.getElementById(id).parentNode;

    // Obtener el input dentro del div contenedor
    var inputObjetivo = divContenedor.querySelector('input');
    var contenidoInputObjetivo = inputObjetivo.value;

    // Obtener el ul dentro del div contenedor
    var ulListaObjetivo = divContenedor.querySelector('ul');
    var id_inputObjetivo = inputObjetivo.id;
    var id_ulListaObjetivo = ulListaObjetivo.id;
    const claveInput = document.getElementById(id_inputObjetivo);
    const claveList = document.getElementById(id_ulListaObjetivo);
    const placeholder = claveInput.placeholder;

    // Obtiene el valor del campo de entrada de la clave
    const claveValue = claveInput.value;
    claveInput.value = '';

    // Verifica si se ha ingresado algo en el campo
    if (claveValue) {
        inputObjetivo.required = false;
        const ingresarAlArreglo = claveValue;
        arreglo.push(ingresarAlArreglo);
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
        parrafoList.textContent = ingresarAlArreglo;

        // Crea un botón de modificación de elemento en lista
        const modificarList = document.createElement('button');

        // Crea un botón de eliminación
        const deleteButton = document.createElement('button');

        if(inputObjetivo.id == claves_idInput){
            modificarList.textContent = 'Modificar';
            deleteButton.textContent = 'Eliminar';
        } else{
            modificarList.textContent = 'M';
            deleteButton.textContent = 'E';
        }

        let contenidoElemento = ingresarAlArreglo;
        
        // Agrega un controlador de eventos al botón de modificación
        modificarList.addEventListener('click', function () {
            // Crea un input para editar el texto
            const editInput = document.createElement('input');
            editInput.maxLength = 15;

            editInput.value = arreglo[arreglo.indexOf(contenidoElemento)];

            // Crea un botón de "Guardar" para confirmar la edición
            const saveButton = document.createElement('button');
            saveButton.textContent = 'Guardar';

            // Función para mostrar los botones de "Modificar" y "Eliminar"
            function mostrarBotones() {
                // Muestra los botones "Modificar" y "Eliminar"
                listItem.appendChild(modificarList);
                listItem.appendChild(deleteButton);
                // Elimina el input y el botón "Guardar"
                /*
                listItem.removeChild(editInput);
                listItem.removeChild(saveButton);
                */
            }

            // Agrega un controlador de eventos al botón "Guardar"
            saveButton.addEventListener('click', function () {
                // Actualiza el texto del elemento de la lista con el valor del input editado
                listItem.textContent = editInput.value;
                mostrarBotones();
                arreglo[arreglo.indexOf(contenidoElemento)] = listItem.textContent;
                // Llama a la función para mostrar los botones
            });

            // Limpia el campo li a tratar y agrega el botón "Guardar"
            listItem.textContent = '';
            listItem.appendChild(editInput);
            listItem.appendChild(saveButton);

            // Oculta los botones "Modificar" y "Eliminar"
            /*
            console.log("listItem.firstChild: " + listItem.children);
            console.log("listItem.firstElementChild: " + listItem.firstElementChild.value);
            listItem.removeChild(modificarList);
            listItem.removeChild(deleteButton);
            */
        });
        numeroIndice = arreglo.length;
        
        // Agrega un controlador de eventos al botón de eliminación
        deleteButton.addEventListener('click', function () {
            const indicePorEliminar = arreglo.indexOf(contenidoElemento);
            if(indicePorEliminar !== -1){
                arreglo.splice(indicePorEliminar, 1);
                claveList.removeChild(listItem);
            } 
            if(arreglo.length < numeroMaximoDeElementos){
                claveInput.readOnly = false;
                claveInput.placeholder = placeholder;
                claveInput.style.cursor = "text";
            }
            arreglo.length > 0 ? inputObjetivo.required = false : inputObjetivo = true;
            if(arreglo.length === 0){
                inputObjetivo.required = true;
            }
                console.log(arreglo);
            // Actualiza los índices de los elementos restantes
            for (numeroIndice = 0; numeroIndice < arreglo.length; numeroIndice++) {
                console.log("tamaño arreglo: "+ arreglo.length);
                let elemento = claveList.children[numeroIndice].querySelector('span');
                let contenidoIndice = elemento.textContent;
                contenidoIndice = contenidoIndice.replace(/\d+\)/, numeroIndice+1 + ')');
                // Asigna el nuevo contenido al elemento
                elemento.textContent = contenidoIndice;
            }
            //arreglo.length === 0 ? document.getElementById("claveList").style.display = "none" : null;
        });

        // Agrega el número de índice al elemento de la lista
        listItem.append(spanList);
        
        // Agrega el párrafo al elemento de la lista
        listItem.appendChild(parrafoList);

        // Agrega el botón de modificación al elemento de lista
        listItem.appendChild(modificarList);

        // Agrega el botón de eliminación al elemento de lista
        listItem.appendChild(deleteButton);

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
        
        // Vuelve a enfocar el campo de entrada clavMues
        claveInput.focus();
        //clavesPierdeFocus();
        if(arreglo.length >= numeroMaximoDeElementos){
            claveInput.readOnly = true;
            claveInput.placeholder = "Superó el límite: " + numeroMaximoDeElementos;
            claveInput.style.cursor = "default";
        }
    }
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
    document.getElementById('formulario').innerHTML = '<form action="/crearRegistro" method="POST" onsubmit="return validarClaves()">' + estrucForm + '<button class="btn-registros" id="btn-crearR" type="submit" onclick="botonSubmit()">Crear nuevo registro</button></form>';
    asignarFuncion_botonMas(claves_idBotonMas, clavesMuestra, clavesMuestra_indice, clavesMuestra_maximo);
    asignarFuncion_botonMas(duracionAnalisis_idBotonMas, duracionAnalisis, duracionAnalisis_indice, duracionAnalisis_maximo);
    asignarFuncion_botonMas(xfti_idBotonMas, xfti, xfti_indice, xfti_maximo);
    asignarFuncion_botonMas(presionCamara_idBotonMas, presionCamara, presionCamara_indice, presionCamara_maximo);
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
    const formatoDurAn = /^(\d{1,3}):([0-5][0-9])$/;
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
    const formatoValido = /^(\d{1,4}):([0-5][0-9])$/;
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