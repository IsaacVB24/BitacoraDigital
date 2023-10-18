// tabla.js
function eliminar() {
    const rutaActual = window.location.pathname;
    const emergente = document.getElementById("emergente-eliminarR");
    emergente.innerHTML = "<div id='contModal'><p id='pregunta'>¿Desea realmente eliminar el registro seleccionado?</p><center><button class='btn-eliminar' id='cancelar' onclick='cancelar()'>CANCELAR</button><button class='btn-eliminar' id='eliminar'>SÍ, ELIMINARLO</button></center></div>";
    const botonEliminar = document.getElementById("eliminar");
    if(rutaActual === "/") {
        botonEliminar.onclick = confirmar;
    } else if(rutaActual === "/visualizarRegistro") {
        botonEliminar.onclick = eliminarEnVis;
    }
    emergente.style.display = "block";
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

function seleccionarTodosLosRegistros() {
    const seleccionarTodo = document.getElementById("seleccionarTodo");
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let alMenosUnoSeleccionado = false;

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            alMenosUnoSeleccionado = true;
            checkbox.checked = false; // Deselecciona todos los checkboxes activos
            handleCheckboxChange({ target: checkbox }); // Llama a la función para manejar el cambio de los checkboxes
        }
    });

    if (!alMenosUnoSeleccionado) {
        checkboxes.forEach(checkbox => {
            checkbox.checked = true; // Selecciona todos los checkboxes
            handleCheckboxChange({ target: checkbox }); // Llama a la función para manejar el cambio de los checkboxes
        });
    }
}

function crear() {
    // Redirigir a crear registro
    window.location.href = 'crearRegistro';
}

function visualizar() {
    // Redirigir a la página visualizarRegistro.html
    window.location.href = 'visualizarRegistro';
}

function modificar() {
    // Redirigir a la página modificarRegistro.html
    window.location.href = 'modificarRegistro';
}

function cancelar() {
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

        // Cambia la URL para que coincida con el parámetro esperado en la ruta
        fetch(`/obtenerRegistro/${registroId}`)
        .then(response => response.json())
        .then(data => {
            // Almacena los 10 valores en localStorage
            localStorage.setItem('registroSeleccionado', JSON.stringify(data));

            // Muestra los 10 valores recuperados en la consola
            console.log('Datos del registro seleccionado:', data);
        })
        .catch(error => console.error('Error al obtener datos del registro:', error));
    } else {
        registrosSeleccionados.delete(registroId);
    }
    const seleccionarTodo = document.getElementById("seleccionarTodo");
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    // Verifica si no todos los checkboxes están seleccionados y ajusta el color de fondo en consecuencia
    if (registrosSeleccionados.size !== checkboxes.length) {
        seleccionarTodo.style.backgroundColor = "#f2f2f2";
    } else {
        seleccionarTodo.style.backgroundColor = "gray";
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
        botonEliminar.addEventListener('mouseenter', function () {
            botonEliminar.style.backgroundColor = "rgb(69, 168, 129)";
        });
        botonEliminar.addEventListener('mouseleave', function () {
            botonEliminar.style.backgroundColor = "rgb(100, 199, 160)";
        });

        botonModificar.style.backgroundColor = '#64c7a0'; // Cambia el color del botón
        botonModificar.style.color = 'black'; // Cambia el color de letra del botón
        botonModificar.style.pointerEvents = "all";
        botonModificar.style.cursor = "pointer";
        botonModificar.disabled = false; // Habilita el botón
        botonModificar.addEventListener('mouseenter', function () {
            botonModificar.style.backgroundColor = "rgb(69, 168, 129)";
        });
        botonModificar.addEventListener('mouseleave', function () {
            botonModificar.style.backgroundColor = "rgb(100, 199, 160)";
        });

        botonVisualizar.style.backgroundColor = '#64c7a0'; // Cambia el color del botón
        botonVisualizar.style.color = 'black'; // Cambia el color de letra del botón
        botonVisualizar.style.pointerEvents = "all";
        botonVisualizar.style.cursor = "pointer";
        botonVisualizar.disabled = false; // Habilita el botón
        botonVisualizar.addEventListener('mouseenter', function () {
            botonVisualizar.style.backgroundColor = "rgb(69, 168, 129)";
        });
        botonVisualizar.addEventListener('mouseleave', function () {
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
                    <td id='encSeleccionar'><input type="checkbox" data-registro-id="${registro.id}" onchange="handleCheckboxChange(event)"></td>
                    <td id='usuario'>${registro.nombre_usuario}</td>
                    <td id='solicitud'>${registro.num_solicitud}</td>
                    <td id='fecha'>${registro.fecha}</td>
                    <td id='clave'>${registro.clave_muestra}</td>
                    <td id='fuentes'>${registro.fuentes_empleadas}</td>
                    <td id="duracionAnalisis">${registro.duracion_analisis}</td>
                `;
                tablaRegistros.appendChild(fila);
            });

            // Si no hay registros, muestra un mensaje
            if (data.length === 0) {
                const sinRegistro = document.createElement('tr');
                sinRegistro.innerHTML = `
                    <td colspan="7"><center id="sinRegistro">Aún no hay registros, <a href="/crearRegistro">cree uno</a> para empezar o importe datos de alguna ruta.</center></th>`;
                tablaRegistros.appendChild(sinRegistro);
            }

            // Habilitar el botón de crear registro después de cargar los datos
            const botonCrear = document.getElementById("crearR");
            botonCrear.style.backgroundColor = '#64c7a0'; // Cambia el color del botón
            botonCrear.style.color = 'black'; // Cambia el color de letra del botón
            botonCrear.style.pointerEvents = "all";
            botonCrear.disabled = false; // Habilita el botón
            botonCrear.addEventListener('mouseenter', function () {
                botonCrear.style.backgroundColor = "rgb(69, 168, 129)";
            });
            botonCrear.addEventListener('mouseleave', function () {
                botonCrear.style.backgroundColor = "rgb(100, 199, 160)";
            });
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
                    // Actualiza la tabla después de la eliminación
                    mostrarRegistros();
                    alert('Registros eliminados con éxito.');
                    seleccionarTodosLosRegistros();
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
