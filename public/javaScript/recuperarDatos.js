// Función que se ejecuta cuando la página se carga
document.addEventListener('DOMContentLoaded', function() {
    // Recupera los datos del Local Storage
    const registrosSeleccionados = JSON.parse(localStorage.getItem('registrosSeleccionados'));

    // Comprueba si hay datos en el Local Storage
    if (!(registrosSeleccionados && registrosSeleccionados.length > 0)) {
        alert('No se encontraron datos en el Local Storage.');
    }
});
