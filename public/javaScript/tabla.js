// tabla.js
const rutaActual = window.location.pathname;

function eliminar() {
    const emergente = document.getElementById("emergente-eliminarR");
    emergente.innerHTML = "<div id='contModal'><p id='pregunta'>¿Desea realmente eliminar el registro seleccionado?</p><center><button class='btn-eliminar' id='cancelar' onclick='cancelar()'>CANCELAR</button><button class='btn-eliminar' id='eliminar'>SÍ, ELIMINARLO</button></center></div>";
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

function habilitarBotonPrincipal(nombreBoton){
    const botonCrear = document.getElementById(nombreBoton);
    // Si no se selecciona ningún registro, habilita el botón de Crear registro
    botonCrear.style.backgroundColor = '#64c7a0';
    botonCrear.style.color = 'black';
    botonCrear.style.pointerEvents = 'all'; // Habilita las interacciones del botón
}
function deshabilitarBotonPrincipal(nombreBoton){
    const botonCrear = document.getElementById(nombreBoton);
    // Si se selecciona uno o más registros, deshabilita el botón de Crear registro
    botonCrear.style.backgroundColor = 'rgba(100, 199, 159, 0.400)';
    botonCrear.style.color = 'rgba(0, 0, 0, 0.450)';
    botonCrear.style.pointerEvents = 'none'; // Deshabilita las interacciones del botón
}
function habilitarBotonEliminarR(){
    const botonEliminar = document.getElementById('eliminarR');
    botonEliminar.style.backgroundColor = '#64c7a0';
    botonEliminar.style.color = 'rgb(121, 0, 0)';
    botonEliminar.style.pointerEvents = 'all';
}
function deshabilitarBotonEliminarR(){
    const botonEliminar = document.getElementById('eliminarR');
    botonEliminar.style.backgroundColor = 'rgba(100, 199, 159, 0.400)';
    botonEliminar.style.color = 'rgba(121, 0, 0, 0.450)';
    botonEliminar.style.pointerEvents = 'none';
}

function seleccionarTodosLosRegistros() {
    //const seleccionarTodo = document.getElementById("seleccionarTodo");
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

document.addEventListener("DOMContentLoaded", function () {
    const table = document.getElementById("tablaMain");
    if(rutaActual === "/"){
        table.addEventListener("click", function (event) {
            const target = event.target;
            if (target.tagName === "TD") {
                const checkbox = target.parentElement.querySelector("input[type='checkbox']");
                if (checkbox) {
                    checkbox.checked = !checkbox.checked;
                    handleCheckboxChange({ target: checkbox }); // Llama a handleCheckboxChange con el checkbox como objetivo
                }
            }
        });
    }
});

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

            // Muestra los valores recuperados en la consola
            //console.log('Datos del registro seleccionado:', data);
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
    
    if(registrosSeleccionados.size === 0){
        console.clear();
        habilitarBotonPrincipal(botonCrear);
        deshabilitarBotonEliminarR();
        deshabilitarBotonPrincipal(botonModificar);
        deshabilitarBotonPrincipal(botonVisualizar);
    }else if(registrosSeleccionados.size === 1){
        deshabilitarBotonPrincipal(botonCrear);
        habilitarBotonPrincipal(botonModificar);
        habilitarBotonPrincipal(botonVisualizar);
        habilitarBotonEliminarR();
    } else if(registrosSeleccionados.size > 1){
        deshabilitarBotonPrincipal(botonCrear);
        deshabilitarBotonPrincipal(botonModificar);
        deshabilitarBotonPrincipal(botonVisualizar);
    }
}

const botonModificar = 'modificarR';
const botonVisualizar = 'visualizarR';
const botonCrear = "crearR";

document.addEventListener('DOMContentLoaded', function () {
    if(rutaActual === '/') document.getElementById('ingresarTexto').addEventListener('input', function (event) {
        realizarBusqueda();
        const seleccionarTodo = document.getElementById("seleccionarTodo");
        seleccionarTodo.style.backgroundColor = "#f2f2f2";
    });
});

function deseleccionarCheckboxes(){
    const checkboxes = document.querySelectorAll('#tablaMain input[type="checkbox"]');
    
    checkboxes.forEach(caja => {
        caja.checked = false;
    });
    // Simular clic doble en el botón de seleccionar todos los registros, para que se limpie la interacción con los botones y se reestablezca como en el inicio
    document.getElementById("seleccionarTodo").click();
    document.getElementById("seleccionarTodo").click();
}

// Función para realizar la búsqueda y mostrar los resultados en la tabla
function realizarBusqueda() {
    deseleccionarCheckboxes();
    const campoBusqueda = document.getElementById('ingresarTexto');
    const terminoBusqueda = campoBusqueda.value.trim().toLowerCase();

    // Realiza una solicitud al servidor para obtener los registros filtrados
    fetch(`/buscarRegistros?termino=${terminoBusqueda}`)
        .then(response => response.json())
        .then(data => {
            const tablaRegistros = document.getElementById('tablaRegistros');
            // Limpia cualquier contenido previo en la tabla
            tablaRegistros.innerHTML = '';

            // Itera sobre los datos y agrega las filas a la tabla
            data.forEach(registro => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td id='encSeleccionar'><input type="checkbox" data-registro-id="${registro.id}" onchange="handleCheckboxChange(event)"></td>
                    <td id='solicitud'>${registro.num_solicitud}</td>
                    <td id='usuario'>${registro.nombre_usuario}</td>
                    <td id='fecha'>${registro.fecha}</td>
                    <td class='truncate' id='clave'>${registro.clave_muestra}</td>
                    <td class='truncate' id='fuentes'>${registro.fuentes_empleadas}</td>
                    <td class='truncate' id="duracionAnalisis">${registro.duracion_analisis}</td>
                `;
                tablaRegistros.appendChild(fila);
            });

            // Si no hay registros coincidentes, muestra un mensaje
            if (data.length === 0) {
                const sinCoincidencias = document.createElement('tr');
                sinCoincidencias.innerHTML = `
                    <td colspan="7"><center id="sinCoincidencias">No hay coincidencias para el término de búsqueda.</center></th>`;
                tablaRegistros.appendChild(sinCoincidencias);
                // Deshabilitar o habilitar botones de interacción con los registros para que vuelvan a su estado original
                habilitarBotonPrincipal(botonCrear);
                deshabilitarBotonEliminarR(botonModificar);
                deshabilitarBotonPrincipal(botonVisualizar);
                deshabilitarBotonEliminarR();
            }
            deseleccionarCheckboxes();
        })
        .catch(error => console.error('Error al realizar búsqueda:', error));
}

// Función para obtener los registros de la base de datos y mostrarlos en la tabla
function mostrarRegistros() {
    // Realiza una solicitud al servidor para obtener los registros
    fetch('/obtenerRegistros')
        .then(response => response.json())
        .then(data => {
            const tablaRegistros = document.getElementById('tablaRegistros');
            //const botonEliminar = document.getElementById('eliminarR'); // Obtén el botón de eliminar
            // Limpia cualquier contenido previo en la tabla
            tablaRegistros.innerHTML = '';

            // Itera sobre los datos y agrega las filas a la tabla
            data.forEach(registro => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td id='encSeleccionar'><input type="checkbox" data-registro-id="${registro.id}" onchange="handleCheckboxChange(event)"></td>
                    <td id='solicitud'>${registro.num_solicitud}</td>
                    <td id='usuario'>${registro.nombre_usuario}</td>
                    <td id='fecha'>${registro.fecha}</td>
                    <td class='truncate' id='clave'>${registro.clave_muestra}</td>
                    <td class='truncate' id='fuentes'>${registro.fuentes_empleadas}</td>
                    <td class='truncate' id="duracionAnalisis">${registro.duracion_analisis}</td>
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
