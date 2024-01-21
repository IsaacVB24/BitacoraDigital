let flag_arreglo = '';
let clavesAModificar = [];
let duracionAnalisisAModificar = ['00:00'];
let xftiAModificar = [];
let presionAModificar = [];

function modificarFormulario() {
  // Recuperar datos del localStorage
  const datosLocalStorage = JSON.parse(localStorage.getItem('registroSeleccionado'));
  const idRegistro = datosLocalStorage.registro.id;

  clavesAModificar = datosLocalStorage.registro.clave_muestra;
  duracionAnalisisAModificar = datosLocalStorage.registro.duracion_analisis;
  xftiAModificar = datosLocalStorage.registro.tiempo_vida_filamentos;
  presionAModificar = datosLocalStorage.registro.presion_camara_analisis;

  agregarFecha();

  if (idRegistro) {
    const inputClaves = document.getElementById("clavMues");

    // Adjuntar un controlador de eventos al formulario
    const formulario = document.createElement('form');
    formulario.action = "/modificarRegistro";
    formulario.method = "POST";
    formulario.innerHTML = `
      <input type="hidden" name="idRegistro" value="${idRegistro}" />
      ${estrucForm}
      <button class="btn-registros" id="btn-crearR" type="submit">Modificar registro</button>
    `;

    formulario.addEventListener('submit', function (event) {
      if(validarClaves() == false) event.preventDefault();
    });

    // Agrega el formulario al elemento con id "formulario"
    const formularioContainer = document.getElementById('formulario');
    formularioContainer.innerHTML = ''; // Limpia el contenedor antes de agregar el formulario
    formularioContainer.appendChild(formulario);
    
    clavesAModificar = clavesAModificar.split(',');
    duracionAnalisisAModificar = duracionAnalisisAModificar.split(',');
    xftiAModificar = xftiAModificar.split(',');
    presionAModificar = presionAModificar.split(',');

    validarFormatoTiempo();
    cargarDatos();

    const ul_claves = document.getElementById(claves_idBotonMas).nextElementSibling;
    const ul_durAn = document.getElementById(duracionAnalisis_idBotonMas).nextElementSibling;
    const ul_xfti = document.getElementById(xfti_idBotonMas).nextElementSibling;
    const ul_presCam = document.getElementById(presionCamara_idBotonMas).nextElementSibling;

    const input_claves = document.getElementById(claves_idBotonMas).previousElementSibling.id;
    const input_durAn = document.getElementById(duracionAnalisis_idBotonMas).previousElementSibling.id;
    const input_xfti = document.getElementById(xfti_idBotonMas).previousElementSibling.id;
    const input_presCam = document.getElementById(presionCamara_idBotonMas).previousElementSibling.id;

    // Activa la función de los botones '+' para cada elemento que manipula arreglos
    asignarFuncion_botonMas(claves_idBotonMas, clavesAModificar, clavesMuestra_maximo, columnasClaves);
    asignarFuncion_botonMas(duracionAnalisis_idBotonMas, duracionAnalisisAModificar, duracionAnalisis_maximo+1, columnasDurAn);
    asignarFuncion_botonMas(xfti_idBotonMas, xftiAModificar, xfti_maximo, columnasXFTI);
    asignarFuncion_botonMas(presionCamara_idBotonMas, presionAModificar, presionCamara_maximo, columnasPresCam);

    ul_claves.innerHTML = '';
    ul_durAn.innerHTML = '';
    ul_xfti.innerHTML = '';
    ul_presCam.innerHTML = '';

    mostrarLista(clavesAModificar, ul_claves, columnasClaves);
    mostrarLista(duracionAnalisisAModificar, ul_durAn, columnasDurAn);
    mostrarLista(xftiAModificar, ul_xfti, columnasXFTI);
    mostrarLista(presionAModificar, ul_presCam, columnasPresCam);

    validarSuperacionTamaño(ul_claves, clavesAModificar, input_claves, clavesMuestra_maximo);
    validarSuperacionTamaño(ul_durAn, duracionAnalisisAModificar, input_durAn, duracionAnalisis_maximo);
    validarSuperacionTamaño(ul_xfti, xftiAModificar, input_xfti, xfti_maximo);
    validarSuperacionTamaño(ul_presCam, presionAModificar, input_presCam, presionCamara_maximo);
    interaccionCamposDeLista();
  } else {
    console.error('No se encontró un idRegistro válido en localStorage.');
  }
}

function obtenerDivPadre(idInputDentro){
  return document.getElementById(idInputDentro).parentElement;
}

function validarSuperacionTamaño(elementoUL, arreglo, idInput, valorMaximo){
  const input = document.getElementById(idInput);
  if(elementoUL.parentElement.querySelector('input').id === idInput){
    if(arreglo.length >= valorMaximo){
      input.readOnly = true;
      input.placeholder = "Superó el límite: " + valorMaximo;
      input.style.cursor = "default";
    }else{
      input.required = false;
    }
  }
}