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