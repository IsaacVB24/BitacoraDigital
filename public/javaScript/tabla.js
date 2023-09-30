// rgb(100, 199, 160) o #64c7a0

function eliminar(){
    console.log("Hola");
    document.getElementById("emergente-eliminarR").innerHTML = "<div id='contModal'><p id='pregunta'>¿Desea realmente eliminar el registro seleccionado?</p><center><button class='btn-eliminar' id='cancelar' onclick='cancelar()'>CANCELAR</button><button class='btn-eliminar' id='eliminar' onclick='confirmar()'>SÍ, ELIMINARLO</button></center></div>";
    document.getElementById("emergente-eliminarR").style.display = "block";
}

function accionEliminar() {
    /*
    // Verificar si al menos un checkbox está seleccionado
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const alMenosUnoSeleccionado = checkboxes.length > 0;
    
    if (alMenosUnoSeleccionado) {
        document.getElementById("emergente-eliminarR").style.display = "block";
    } else {
        // Puedes mostrar un mensaje de advertencia al usuario aquí
        alert("Por favor, seleccione al menos un registro para eliminar.");
    }
    */
}

function cancelar(){
    document.getElementById("emergente-eliminarR").style.display = "none";
}

function confirmar(){
    // Registro eliminado
}


// Variable para almacenar los IDs de los registros seleccionados
const registrosSeleccionados = new Set();

// Función para manejar el cambio en los checkboxes
function handleCheckboxChange(event) {
    const checkbox = event.target;
    const registroId = checkbox.getAttribute('data-registro-id');
    if (checkbox.checked) {
        registrosSeleccionados.add(registroId);
    } else {
        registrosSeleccionados.delete(registroId);
    }

    // Habilitar o deshabilitar el botón de eliminar según si hay registros seleccionados
    const botonEliminar = document.getElementById('eliminarR'); // Mueve esta línea aquí
    if (registrosSeleccionados.size > 0) {
        botonEliminar.style.backgroundColor = '#64c7a0'; // Cambia el color del botón
        botonEliminar.style.color = '#600000'; // Cambia el color del botón
        botonEliminar.style.pointerEvents = "all";
        botonEliminar.style.cursor = "pointer";
        botonEliminar.disabled = false; // Habilita el botón
    } else {
        botonEliminar.style.backgroundColor = 'rgba(100, 199, 159, 0.400)';
        botonEliminar.style.color = 'rgba(121, 0, 0, 0.450)';
        botonEliminar.style.pointerEvents = 'none'; // Deshabilita las interacciones del botón
    }
}

// Función para obtener los registros de la base de datos y mostrarlos en la tabla
function mostrarRegistros() {
    // Realiza una solicitud al servidor para obtener los registros
    fetch('/obtenerRegistros') 
        .then(response => response.json())
        .then(data => {
            const tablaRegistros = document.getElementById('tablaRegistros');
            const botonEliminar = document.getElementById('eliminarR'); // Obtén el botón de eliminar
            // Limpia cualquier contenido previo en la tabla
            tablaRegistros.innerHTML = '';

            // Itera sobre los datos y agrega las filas a la tabla
            data.forEach(registro => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td><input type="checkbox" data-registro-id="${registro.id}" onchange="handleCheckboxChange(event)"></td>
                    <td>${registro.nombre_usuario}</td>
                    <td>${registro.num_solicitud}</td>
                    <td>${registro.fecha}</td>
                    <td>${registro.clave_muestra}</td>
                    <td>${registro.fuentes_empleadas}</td>
                `;
                tablaRegistros.appendChild(fila);
            });

            // Si no hay registros, muestra un mensaje
            if (data.length === 0) {
                const sinRegistro = document.createElement('tr');
                sinRegistro.innerHTML = `
                    <td colspan="6"><center id="sinRegistro">Aún no hay registros, <a href="/crearRegistro">cree uno</a> para empezar o importe datos de alguna ruta.</center></th>
                `;
                tablaRegistros.appendChild(sinRegistro);
            }
        })
        .catch(error => console.error('Error al obtener registros:', error));
}

// Llama a la función para mostrar los registros al cargar la página
window.onload = mostrarRegistros;
