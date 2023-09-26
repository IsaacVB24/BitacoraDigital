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