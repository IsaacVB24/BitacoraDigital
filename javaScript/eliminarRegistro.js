/*
const modal = document.getElementById("modal");
const mostrarModal = document.getElementById("mostrarModal");
const cerrarModal = document.getElementById("cerrarModal");

function eliminarRegistro(){
    // Mostrar modal
    mostrarModal.addEventListener("click", () => {
        modal.style.display = "block";
    });
    
    // Cerrar modal
    cerrarModal.addEventListener("click", () => {
        modal.style.display = "none";
    });
    
    // Cerrar modal haciendo clic fuera del contenido
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
}
*/

function eliminar(){
    document.getElementById("emergente-eliminarR").innerHTML = "<div id='contModal'><p id='pregunta'>¿Desea realmente eliminar el registro seleccionado?</p><center><button class='btn-eliminar' id='cancelar' onclick='cancelar()'>CANCELAR</button><button class='btn-eliminar' id='eliminar' onclick='confirmar()'>SÍ, ELIMINARLO</button></center></div>";
    document.getElementById("emergente-eliminarR").style.display = "none";
}

function accionEliminar(){
    document.getElementById("emergente-eliminarR").style.display = "block";
}

function cancelar(){
    document.getElementById("emergente-eliminarR").style.display = "none";
}

function confirmar(){
    // Registro eliminado
}