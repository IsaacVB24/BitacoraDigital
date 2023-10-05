// Función para recolectar y guardar datos del registro seleccionado en el Local Storage
function guardarDatosDelRegistroSeleccionado() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const registrosSeleccionados = [];

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            // Obtén los datos del registro correspondiente y agrégalos a la lista de registros seleccionados
            const registro = obtenerDatosDelRegistro(checkbox);
            registrosSeleccionados.push(registro);
        }
    });

    // Guarda los datos en el Local Storage
    localStorage.setItem('registrosSeleccionados', JSON.stringify(registrosSeleccionados));

    // Agrega un console.log para ver lo que se guarda en el Local Storage
    //console.log('Datos guardados en el Local Storage:', registrosSeleccionados);
}

// Función para obtener los datos del registro asociados al checkbox
function obtenerDatosDelRegistro(checkbox) {
    // Obtén los elementos td que contienen los datos del registro
    const tdElements = checkbox.parentElement.parentElement.getElementsByTagName('td');

    // Extrae los valores de los campos del registro
    const id = checkbox.getAttribute('data-registro-id');
    const nombre_usuario = tdElements[1].textContent;
    const num_solicitud = tdElements[2].textContent;
    const fecha = tdElements[3].textContent;
    const clave_muestra = tdElements[4].textContent;
    const fuentes_empleadas = tdElements[5].textContent;

    // Devuelve los datos del registro como un objeto
    return {
        id,
        nombre_usuario,
        num_solicitud,
        fecha,
        clave_muestra,
        fuentes_empleadas,
    };
}

// Agrega un evento para llamar a la función de guardar datos cuando se haga clic en algún checkbox
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', guardarDatosDelRegistroSeleccionado);
});
