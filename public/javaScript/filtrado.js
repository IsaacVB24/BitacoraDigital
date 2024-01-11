const estrVentFiltrado = '<div id="filtros_year_month"><div id="months" class="filtro-group"><p>Mes:</p><br></div><div id="years" class="filtro-group"><p>Año:</p></div><div id="botonesFiltros"><button class="btn-registros" id="cancelar" onclick="cancelarFiltros()">Cancelar</button><button class="btn-registros" id="aplicarFiltros">Aplicar filtros</button></div></div>';

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
    
}

function cancelarFiltros(){
    document.getElementById('emergente-filtros').innerHTML = '';
    document.getElementById('emergente-filtros').style.display = 'none';
}