// Función para obtener los registros de la base de datos y mostrarlos en la tabla
function mostrarRegistros() {
    // Realiza una solicitud al servidor para obtener los registros
    fetch('/obtenerRegistros') 
        .then(response => response.json())
        .then(data => {
            const tablaRegistros = document.getElementById('tablaRegistros');

            // Limpia cualquier contenido previo en la tabla
            tablaRegistros.innerHTML = '';

            // Itera sobre los datos y agrega las filas a la tabla
            data.forEach(registro => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td><input type="checkbox"></td>
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
                    <td colspan="6"><center id="sinRegistro">Aún no hay registros, <a href=/crearRegistro>cree uno</a> para empezar o importe datos de alguna ruta.</center></th>
                `;
                tablaRegistros.appendChild(sinRegistro);
            }
        })
        .catch(error => console.error('Error al obtener registros:', error));
}

// Llama a la función para mostrar los registros al cargar la página
window.onload = mostrarRegistros;