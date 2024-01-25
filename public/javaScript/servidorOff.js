function encenderServidor(){
}
function cuestionarApagado() {
    const emergente = document.getElementById("emergente-eliminarR");
    emergente.innerHTML = "<div id='contModal'><p id='pregunta'>⚠️ ¿Desea realmente apagar el sistema? ⚠️</p><center><button class='btn-eliminar' id='cancelar' onclick='cancelar()'>CANCELAR</button><button class='btn-eliminar' id='eliminar' onclick='apagarServidor()'>SÍ, APAGAR</button></center></div>";

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

function apagarServidor() {
    fetch('/apagarServidor')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al apagar el servidor: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Servidor apagado correctamente');
        })
        .catch(error => {
            console.error(`Error al apagar el servidor: ${error.message}`);
        });
    alert('Servidor apagado correctamente.\nPuede cerrar esta ventana.');
}