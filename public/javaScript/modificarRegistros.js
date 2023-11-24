let flag_arreglo = '';
let clavesAModificar = [];
let duracionAnalisisAModificar = [];
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
      if (!clavesAModificar || clavesAModificar.length === 0 || validarClaves() == false) {
        event.preventDefault(); // Evita el envío del formulario
        inputClaves.focus();
      }
    });

    // Agrega el formulario al elemento con id "formulario"
    const formularioContainer = document.getElementById('formulario');
    formularioContainer.innerHTML = ''; // Limpia el contenedor antes de agregar el formulario
    formularioContainer.appendChild(formulario);

    // Carga datos, valida el formato del tiempo y realiza otras operaciones necesarias
    cargarDatos();
    clavesAModificar = clavesAModificar.split(',');
    duracionAnalisisAModificar = duracionAnalisisAModificar.split(',');
    xftiAModificar = xftiAModificar.split(',');
    presionAModificar = presionAModificar.split(',');

    validarFormatoTiempo();
    
    //Código para agregar botones de modificar y eliminar
    const divPadre_claves = obtenerDivPadre(claves_idInput);
    const divPadre_duracionAnalisis = obtenerDivPadre(durAn_idInput);
    const divPadre_xfti = obtenerDivPadre(xfti_idInput);
    const divPadre_presCam = obtenerDivPadre(presCam_idInput);
    document.querySelectorAll('ul').forEach(elementoUL => {
      let arreglo = [];
      let idInput = '';
      let valor_maximo = 0;
      console.log("elementoUL.parentElement.id: " + elementoUL.parentElement.id);
      if(elementoUL.parentElement.id === divPadre_claves.id){
        console.log("CLAVES");
        arreglo = clavesAModificar;
        idInput = claves_idInput;
        valor_maximo = clavesMuestra_maximo;
      }else{
          if(elementoUL.parentElement.id === divPadre_duracionAnalisis.id){
          console.log("duracion");
          arreglo = duracionAnalisisAModificar;
          idInput = durAn_idInput;
          valor_maximo = duracionAnalisis_maximo;
        }else{
            if(elementoUL.parentElement.id === divPadre_xfti.id){
              console.log("xfti");
              arreglo = xftiAModificar;
              idInput = xfti_idInput;
              valor_maximo = xfti_maximo;
            } else{
                if(elementoUL.parentElement.id === divPadre_presCam.id){
                  console.log("prescam");
                  arreglo = presionAModificar;
                  idInput = presCam_idInput;
                  valor_maximo = presionCamara_maximo;
                }
            }
        }
      }
      validarSuperacionTamaño(elementoUL, arreglo, idInput, valor_maximo);
      elementoUL.querySelectorAll('li').forEach(elementoLI => {
        const botonModificar = document.createElement('button');
        const botonEliminar = document.createElement('button');
        if(elementoUL.parentElement.querySelector('input').id == claves_idInput){
          botonModificar.textContent = 'Modificar';
          botonEliminar.textContent = 'Eliminar';
      } else{
          botonModificar.textContent = 'M';
          botonEliminar.textContent = 'E';
      }
      // Falta adaptar el addEventListener para modificar registros y agregar el botón para modificar
      botonEliminar.addEventListener('click', function () {
        const indicePorEliminar = arreglo.indexOf(contenidoElemento);
        if(indicePorEliminar !== -1){
            arreglo.splice(indicePorEliminar, 1);
            claveList.removeChild(listItem);
        } 
        if(arreglo.length < numeroMaximoDeElementos){
            claveInput.readOnly = false;
            claveInput.placeholder = placeholder;
        }
        arreglo.length > 0 ? inputObjetivo.required = false : inputObjetivo = true;
        if(arreglo.length === 0){
            inputObjetivo.required = true;
        }
        // Actualiza los índices de los elementos restantes
        for (numeroIndice = 0; numeroIndice < arreglo.length; numeroIndice++) {
            let elemento = claveList.children[numeroIndice].querySelector('span');
            let contenidoIndice = elemento.textContent;
            contenidoIndice = contenidoIndice.replace(/\d+\)/, numeroIndice+1 + ')');
            // Asigna el nuevo contenido al elemento
            elemento.textContent = contenidoIndice;
        }
        //arreglo.length === 0 ? document.getElementById("claveList").style.display = "none" : null;
    });
      elementoLI.appendChild(botonModificar);
      elementoLI.appendChild(botonEliminar);
      });
    });
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
    }
  }
  if(idInput === presCam_idInput) console.log(arreglo);
}