const estrVentFiltrado = '<div id="filtros_year_month"><div id="months" class="filtro-group"><p>Mes:</p><br></div><div id="years" class="filtro-group"><p>Año:</p></div><div id="botonesFiltros"><button class="btn-registros" id="cancelar" onclick="cancelarFiltros()">Cancelar</button><button class="btn-registros" id="aplicarFiltros" onclick="filtrado()">Aplicar filtros</button></div></div>';

function activarVentanaFiltrado(){
    const divVentanaFiltros = document.getElementById('emergente-filtros');
    divVentanaFiltros.innerHTML = estrVentFiltrado;

    const botonFiltrar = document.getElementById('emergente-filtros');
    botonFiltrar.style.display = 'block';

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            cancelarFiltros();
        }
    });
    cargarMeses();
    cargarAnios();
    document.getElementById('aplicarFiltros').disabled = true;
}

function cargarMeses(){
    const divMeses = document.getElementById('months');

    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    meses.forEach((mes, indice) => {
        const contenedor = document.createElement('div');
        contenedor.className = 'contenedorOpcion';

        const opcion = document.createElement('input');
        opcion.type = 'checkbox';
        opcion.value = indice + 1;
        opcion.id = `mesCheckbox${indice + 1}`;
        opcion.addEventListener('change', actualizarBotonFiltros); // Agregamos el evento change
        // console.log(opcion);

        const etiqueta = document.createElement('label');
        etiqueta.htmlFor = `mesCheckbox${indice + 1}`;
        etiqueta.appendChild(document.createTextNode(mes));
        // console.log(etiqueta);

        contenedor.appendChild(opcion);
        contenedor.appendChild(etiqueta);

        divMeses.appendChild(contenedor);
    });
}

function cargarAnios(){
    const divAnios = document.getElementById('years');

    // Consultar la base de datos para obtener los años únicos
    fetch('/obtenerAnios')
        .then(response => response.json())
        .then(anios => {
            anios.forEach(anio => {
                const contenedor = document.createElement('div');
                contenedor.className = 'contenedorOpcion';

                const opcion = document.createElement('input');
                opcion.type = 'checkbox';
                opcion.value = anio;
                opcion.id = `anioCheckbox${anio}`;
                opcion.addEventListener('change', actualizarBotonFiltros); // Agregamos el evento change

                const etiqueta = document.createElement('label');
                etiqueta.htmlFor = `anioCheckbox${anio}`;
                etiqueta.appendChild(document.createTextNode('\u00a0' + anio));

                contenedor.appendChild(opcion);
                contenedor.appendChild(etiqueta);

                divAnios.appendChild(contenedor);
            });
        })
        .catch(error => console.error('Error al cargar los años:', error));
}

function cancelarFiltros(){
    document.getElementById('emergente-filtros').innerHTML = '';
    document.getElementById('emergente-filtros').style.display = 'none';
}

function actualizarBotonFiltros() {
    const checkboxesMeses = document.querySelectorAll('#months input[type="checkbox"]');
    const checkboxesAnios = document.querySelectorAll('#years input[type="checkbox"]');
    const botonFiltros = document.getElementById('aplicarFiltros');

    // Verificar si al menos un checkbox de meses o años está seleccionado
    const algunoSeleccionado = Array.from(checkboxesMeses).some(checkbox => checkbox.checked) || 
                               Array.from(checkboxesAnios).some(checkbox => checkbox.checked);

    botonFiltros.disabled = !algunoSeleccionado;
    botonFiltros.addEventListener('mouseenter', function () {
        botonFiltros.disabled ? botonFiltros.style.cursor = 'default' : botonFiltros.style.cursor = 'pointer';
    });
}

function filtrado(){
    //COMPLETAR
}