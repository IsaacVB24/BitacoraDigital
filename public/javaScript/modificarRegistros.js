function modificarFormulario() {
    // Recuperar datos del localStorage
    const datosLocalStorage = JSON.parse(localStorage.getItem('registroSeleccionado'));
    const idRegistro = datosLocalStorage.registro.id;

    agregarFecha();

    // Verifica si se ha almacenado un idRegistro válido en localStorage
    if (idRegistro) {
      // Crea el formulario con el idRegistro como un campo oculto
      const formularioHTML = `<form action="/modificarRegistro" method="POST">
        <input type="hidden" name="idRegistro" value="${idRegistro}" />
        ${estrucForm}
        <button class="btn-registros" id="btn-crearR" type="submit">Modificar registro</button>
      </form>`;
  
      // Agrega el formulario al elemento con id "formulario"
      document.getElementById('formulario').innerHTML = formularioHTML;
      
      // Carga datos, valida el formato del tiempo, u otras operaciones necesarias
      cargarDatos();
      validarFormatoTiempo();
    } else {
      // Manejar el caso en el que no haya un idRegistro válido en localStorage
      console.error('No se encontró un idRegistro válido en localStorage.');
      // Puedes redirigir al usuario o mostrar un mensaje de error, según tus necesidades.
    }
}  