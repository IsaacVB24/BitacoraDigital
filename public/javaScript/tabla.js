// rgb(100, 199, 160) o #64c7a0

function eliminar(){
    document.getElementById("emergente-eliminarR").innerHTML = "<div id='contModal'><p id='pregunta'>¿Desea realmente eliminar el registro seleccionado?</p><center><button class='btn-eliminar' id='cancelar' onclick='cancelar()'>CANCELAR</button><button class='btn-eliminar' id='eliminar' onclick='confirmar()'>SÍ, ELIMINARLO</button></center></div>";
    document.getElementById("emergente-eliminarR").style.display = "block";
}

const seleccionarTodo = document.getElementById("seleccionarTodo");

function seleccionarTodosLosRegistros() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = !checkbox.checked; // Cambia el estado de todos los checkboxes
        handleCheckboxChange({ target: checkbox }); // Llama a la función para manejar el cambio de los checkboxes
    });
}

function deseleccionarTodos() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = false; // Desactiva todos los checkboxes
    });

    // Desactiva el checkbox "Seleccionar Todos" (si existe)
    if (seleccionarTodo) {
        seleccionarTodo.checked = false;
    }
}

function crear(){
    // Redirigir a crear registo
    window.location.href = 'crearRegistro';
}
function visualizar(){
    // Redirigir a la página visualizarRegistro.html
    window.location.href = 'visualizarRegistro';
}
function modificar(){
    // Redirigir a la página modificarRegistro.html
    window.location.href = 'modificarRegistro';
}

function cancelar(){
    document.getElementById("emergente-eliminarR").style.display = "none";
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
    const botonEliminar = document.getElementById('eliminarR');
    const botonModificar = document.getElementById('modificarR');
    const botonVisualizar = document.getElementById('visualizarR');
    const botonCrear = document.getElementById("crearR");
    botonEliminar.style.pointerEvents = "none";
    botonModificar.style.pointerEvents = "none";
    botonVisualizar.style.pointerEvents = "none";
    if (registrosSeleccionados.size > 0) {
        botonEliminar.style.backgroundColor = '#64c7a0'; // Cambia el color del botón
        botonEliminar.style.color = '#600000'; // Cambia el color de letra del botón
        botonEliminar.style.pointerEvents = "all";
        botonEliminar.disabled = false; // Habilita el botón
        botonEliminar.addEventListener('mouseenter', function(){
            botonEliminar.style.backgroundColor = "rgb(69, 168, 129)";
        });
        botonEliminar.addEventListener('mouseleave', function(){
            botonEliminar.style.backgroundColor = "rgb(100, 199, 160)";
        });

        botonModificar.style.backgroundColor = '#64c7a0'; // Cambia el color del botón
        botonModificar.style.color = 'black'; // Cambia el color de letra del botón
        botonModificar.style.pointerEvents = "all";
        botonModificar.style.cursor = "pointer";
        botonModificar.disabled = false; // Habilita el botón
        botonModificar.addEventListener('mouseenter', function(){
            botonModificar.style.backgroundColor = "rgb(69, 168, 129)";
        });
        botonModificar.addEventListener('mouseleave', function(){
            botonModificar.style.backgroundColor = "rgb(100, 199, 160)";
        });

        botonVisualizar.style.backgroundColor = '#64c7a0'; // Cambia el color del botón
        botonVisualizar.style.color = 'black'; // Cambia el color de letra del botón
        botonVisualizar.style.pointerEvents = "all";
        botonVisualizar.style.cursor = "pointer";
        botonVisualizar.disabled = false; // Habilita el botón
        botonVisualizar.addEventListener('mouseenter', function(){
            botonVisualizar.style.backgroundColor = "rgb(69, 168, 129)";
        });
        botonVisualizar.addEventListener('mouseleave', function(){
            botonVisualizar.style.backgroundColor = "rgb(100, 199, 160)";
        });

        botonCrear.style.backgroundColor = 'rgba(100, 199, 159, 0.400)'; // Cambia el color del botón
        botonCrear.style.color = 'rgba(0, 0, 0, 0.450)'; // Cambia el color de letra del botón
        botonCrear.style.pointerEvents = "none";
        botonCrear.disabled = false; // Habilita el botón
    } else {
        botonEliminar.style.backgroundColor = 'rgba(100, 199, 159, 0.400)';
        botonEliminar.style.color = 'rgba(121, 0, 0, 0.450)';
        botonEliminar.style.pointerEvents = 'none'; // Deshabilita las interacciones del botón
        
        botonModificar.style.backgroundColor = 'rgba(100, 199, 159, 0.400)';
        botonModificar.style.color = 'rgba(0, 0, 0, 0.450)';
        botonModificar.style.pointerEvents = 'none'; // Deshabilita las interacciones del botón
        
        botonVisualizar.style.backgroundColor = 'rgba(100, 199, 159, 0.400)';
        botonVisualizar.style.color = 'rgba(0, 0, 0, 0.450)';
        botonVisualizar.style.pointerEvents = 'none'; // Deshabilita las interacciones del botón
        
        botonCrear.style.backgroundColor = '#64c7a0'; // Cambia el color del botón
        botonCrear.style.color = 'black'; // Cambia el color de letra del botón
        botonCrear.style.pointerEvents = "all";
        botonCrear.disabled = false; // Habilita el botón
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
                    <td colspan="6"><center id="sinRegistro">Aún no hay registros, <a href="/crearRegistro">cree uno</a> para empezar o importe datos de alguna ruta.</center></th>`;
                tablaRegistros.appendChild(sinRegistro);
            }
        })
        .catch(error => console.error('Error al obtener registros:', error));
}

function confirmar() {
    const botonEliminar = document.getElementById('eliminarR');
    const botonModificar = document.getElementById('modificarR');
    const botonVisualizar = document.getElementById('visualizarR');
    if (registrosSeleccionados.size > 0) {
        const registrosAEliminar = Array.from(registrosSeleccionados); // Convierte el conjunto a un array
        //console.log('IDs de registros a eliminar:', registrosAEliminar);

        // Envía una solicitud para eliminar los registros seleccionados
        fetch('/eliminarRegistros', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ registros: registrosAEliminar }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Registros eliminados con éxito.');
                // Actualiza la tabla después de la eliminación
                mostrarRegistros();
            } else {
                alert('Error al eliminar registros.');
            }
        })
        .catch(error => console.error('Error al eliminar registros:', error));
        document.getElementById("emergente-eliminarR").style.display = "none";
        registrosSeleccionados.clear();
        botonEliminar.style.backgroundColor = 'rgba(100, 199, 159, 0.400)';
        botonEliminar.style.color = 'rgba(121, 0, 0, 0.450)';
        botonEliminar.style.pointerEvents = 'none'; // Deshabilita las interacciones del botón
        
        botonModificar.style.backgroundColor = 'rgba(100, 199, 159, 0.400)';
        botonModificar.style.color = 'rgba(0, 0, 0, 0.450)';
        botonModificar.style.pointerEvents = 'none'; // Deshabilita las interacciones del botón
        
        botonVisualizar.style.backgroundColor = 'rgba(100, 199, 159, 0.400)';
        botonVisualizar.style.color = 'rgba(0, 0, 0, 0.450)';
        botonVisualizar.style.pointerEvents = 'none'; // Deshabilita las interacciones del botón
    } else {
        alert("Por favor, seleccione al menos un registro para eliminar.");
    }
}

// Llama a la función para mostrar los registros al cargar la página
window.onload = mostrarRegistros;