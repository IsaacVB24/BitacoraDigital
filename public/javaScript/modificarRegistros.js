let clavesRecibidas = '';
let clavesAModificar = [];

function modificarFormulario() {
  // Recuperar datos del localStorage
  const datosLocalStorage = JSON.parse(localStorage.getItem('registroSeleccionado'));
  const idRegistro = datosLocalStorage.registro.id;

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
      if (!clavesAModificar || clavesAModificar.length === 0) {
        alert("Ingrese al menos una clave de muestra");
        event.preventDefault(); // Evita el envío del formulario
        inputClaves.focus();
      }
      inputClaves.blur();
      ocultarLista();
    });

    // Agrega el formulario al elemento con id "formulario"
    const formularioContainer = document.getElementById('formulario');
    formularioContainer.innerHTML = ''; // Limpia el contenedor antes de agregar el formulario
    formularioContainer.appendChild(formulario);

    // Carga datos, valida el formato del tiempo y realiza otras operaciones necesarias
    cargarDatos();
    clavesAModificar = clavesRecibidas.split(',');
    crearListaDeMuestras(clavesAModificar);
    mostrarLista();
    validarFormatoTiempo();
    //atencionFocus();
    document.getElementById("botonMas").onclick = function() {
      botonMas(clavesAModificar);
    };
  } else {
    console.error('No se encontró un idRegistro válido en localStorage.');
    // Puedes redirigir al usuario o mostrar un mensaje de error según tus necesidades.
  }
}

function botonModificar(event) {
  if (!clavesAModificar || clavesAModificar.length === 0) {
    alert("Ingrese al menos una clave de muestra");
    document.getElementById('clavMues').focus();
    event.preventDefault(); // Evita el envío del formulario
  }
}

function validarModificacion(arreglo){
  const inputClaves = document.getElementById('clavMues');
  if(arreglo.length === 0){
    alert("Ingrese al menos una clave de muestra");
    inputClaves.focus(); // Establece el foco en el campo "clavMues"
    return false;
  }
  inputClaves.blur();
  return true
}

//Esta función se deja de usar desde la versión 1.4.4 por requerimiento de usuario
function atencionFocus(){
  const inputClaves = document.getElementById("clavMues");
  inputClaves.addEventListener("focus", mostrarLista);
  const inputs = document.querySelectorAll('input'); // Obtener todos los inputs

  const clavMuesInput = document.getElementById('clavMues');
  //const claveList = document.getElementById('claveList');

    clavMuesInput.addEventListener('blur', function () {
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
              if (input.id !== 'clavMues') {
                ocultarLista();
              }
            });
          });
    });
}
function mostrarLista(){
  const inputClaves = document.getElementById("clavMues");
  const lista = document.getElementById("claveList");
  inputClaves.value = '';
  if (clavesAModificar.length > 0) lista.style.display = "block";
}
function ocultarLista(){
  const inputClaves = document.getElementById("clavMues");
  const lista = document.getElementById("claveList");

  inputClaves.value = clavesAModificar;
  lista.style.display = "none";
}

function crearListaDeMuestras(claves){
  const claveInput = document.getElementById('clavMues');
  const claveList = document.getElementById('claveList');
  for(let i = 0; i < claves.length; i++){ 
    // Crea un nuevo elemento de lista
    const listItem = document.createElement('li');
    listItem.textContent = claves[i];

    // Crea un botón de eliminación
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    // Agrega un controlador de eventos al botón de eliminación
    deleteButton.addEventListener('click', function () {
        claveList.removeChild(listItem);
        clavesAModificar.splice(clavesAModificar.indexOf(claves[i]), 1);
        clavesAModificar.length === 0 ? document.getElementById("claveList").style.display = "none" : null;
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

    // Asegura que la lista tenga una altura máxima de 50px y habilite el scroll si es necesario
    claveList.style.maxHeight = '90%';
    claveList.style.overflowY = 'auto';
  }
}