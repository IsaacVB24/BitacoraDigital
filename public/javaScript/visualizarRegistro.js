function visualizar(){
    //readonly onmousedown="return false;"
    const cuadro = document.getElementsByTagName("input");
    for(let i=0; i<cuadro.length;i++){
        cuadro[i].readOnly = true;
        cuadro[i].onmousedown = "return false";
    }
}

function eliminarEnVis() {
    // Obtén el ID del registro seleccionado almacenado en localStorage
    const registroSeleccionado = JSON.parse(localStorage.getItem('registroSeleccionado'));
    //console.log(registroSeleccionado);
    // Si hay un registro seleccionado, procede a eliminarlo
    if (registroSeleccionado) {
        const registroId = registroSeleccionado.registro.id;
        //console.log(registroId);
        const url = `/eliminarRegistro/${registroId}`; // Construye la URL con el ID del registro

        fetch(url, {
            method: 'DELETE', // Usa el método HTTP DELETE
        })
        .then(response => {
            if (response.ok) {
                // El servidor respondió correctamente, muestra un alert informativo
                alert('Registro eliminado con éxito');
                // Redirige a la página principal
                window.location.href = '/';
            } else {
                // El servidor respondió con un error, puedes manejarlo de la manera que consideres adecuada.
                console.error('Error al eliminar el registro:', response.status);
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
        });
    } else {
        console.error('No hay registro seleccionado para eliminar.');
    }
}

function visFormulario() {
    document.getElementById("formulario").innerHTML = estrucForm;
    //console.log(document.querySelectorAll('ul'));
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
    document.getElementById("observaciones").style.borderStyle = "dashed";
    document.getElementById(claves_idBotonMas).style.display = "none";
    document.getElementById(duracionAnalisis_idBotonMas).style.display = "none";
    document.getElementById(xfti_idBotonMas).style.display = "none";
    document.getElementById(presionCamara_idBotonMas).style.display = "none";
    // document.getElementById("claveList").style.display = "none";
    // document.getElementById("clavMues").style.width = "100%";
    agregarFecha();
    cargarDatos();
}