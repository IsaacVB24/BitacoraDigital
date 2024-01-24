function encenderServidor(){
}
function cuestionarApagado() {
    const emergente = document.getElementById("emergente-eliminarR");
    emergente.innerHTML = "<div id='contModal'><p id='pregunta'>⚠️ ¿Desea realmente apagar el sistema? ⚠️</p><center><button class='btn-eliminar' id='cancelar' onclick='cancelar()'>CANCELAR</button><button class='btn-eliminar' id='eliminar'>SÍ, APAGAR</button></center></div>";
    const botonEliminar = document.getElementById("eliminar");
    let numeroCheckboxesSeleccionados = 0; // Variable para almacenar el número de checkboxes seleccionados

    if(rutaActual === "/") {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                numeroCheckboxesSeleccionados++;
            }
        });
        if(numeroCheckboxesSeleccionados > 1){
            document.getElementById("pregunta").innerHTML = "¿Desea realmente eliminar " + numeroCheckboxesSeleccionados + " registros seleccionados?";
            document.getElementById("eliminar").innerHTML = "SÍ, ELIMINARLOS";
        }
        botonEliminar.onclick = confirmar;
    } else if(rutaActual === "/visualizarRegistro") {
        botonEliminar.onclick = eliminarEnVis;
    }
    emergente.style.display = "block";
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            cancelar();
        }
    });
    emergente.addEventListener('click', function () {
        cancelar();
    });

}