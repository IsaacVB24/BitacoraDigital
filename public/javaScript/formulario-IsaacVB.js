let estrucForm = '<div id="fila1"><div><label for="nomUs">Nombre de usuario:</label><input type="text" name="nomUs" id="nomUs" maxlength="20" placeholder="Ingrese nombre de usuario" required></div><div><label for="numSol">Número de solicitud:</label><input type="text" name="numSol" id="numSol" placeholder="Ingrese número de solicitud" required></div></div><div id="fila2"><div><label for="clavMues">Clave de muestra:</label><input type="text" name="clavMues" id="clavMues" placeholder="Ingrese máximo 15 claves separadas por coma" required></div><div><label for="fuenEmpl">Fuentes empleadas:</label><input type="text" name="fuenEmpl" id="fuenEmpl" placeholder="Ingrese las fuentes empleadas" required></div></div><div id="fila3"><div><label for="hdurAn">Duración del análisis:</label><input type="number" name="hdurAn" id="hdurAn" placeholder="HH" min="0" max="999" required><label for="mdurAn">:</label><input type="number" name="mdurAn" id="mdurAn" placeholder="MM" min="1" max="59" required></div><div><label for="hxfti">Tiempo de vida de filamentos de rayos X (XFTI):</label><input type="number" name="hxfti" id="hxfti" placeholder="HH" min="0" max="9999" required><label for="mxfti"></label>:<input type="number" name="mxfti" id="mxfti" placeholder="MM" min="1" max="59" required></div><div><label for="presCam">Presión en cámara de análisis (mbar):</label><input type="number" name="presCam" id="presCam" placeholder="Presión en mbar" min="1" required></div></div><div id="fila4"><label for="observaciones">Observaciones y/o eventos:</label><textarea name="observaciones" id="observaciones" cols="30" rows="5" placeholder="En caso de haber comentarios, colocarlos aquí."></textarea></div>';

function crearFormulario(){
    document.getElementById('formulario').innerHTML = '<form action="/crearRegistro" method="POST">' + estrucForm + '<button class="btn-registros" id="btn-crearR" type="submit">Crear nuevo registro</button></div></form>';
}

function visFormulario(){
    document.getElementById("formulario").innerHTML = estrucForm;
    const coleccion = document.getElementsByTagName("input");
    document.getElementById("observaciones").borderStyle = "dashed";
    document.getElementById("observaciones").readOnly = "true";
    document.getElementById("observaciones").onmousedown = "return false";
    document.getElementById("observaciones").style.cursor = "default";
    for(var i = 0; i<coleccion.length; i++){
        coleccion[i].style.borderStyle = "dashed";    
        coleccion[i].readOnly = true;
        coleccion[i].onmousedown = "return false";
        coleccion[i].style.cursor = "default";
    }
    cargarDatos();
}

function cargarDatos(){
    document.getElementById("nomUs").value = "Usuario registrado";
    document.getElementById("numSol").value = "Número de solicitud registrado";
    document.getElementById("clavMues").value = "Clave registrada";
    document.getElementById("fuenEmpl").value = "Fuentes empleadas registradas";
    document.getElementById("hdurAn").value = "999";
    document.getElementById("mdurAn").value = "59";
    document.getElementById("hxfti").value = "9999";
    document.getElementById("mxfti").value = "59";
    document.getElementById("presCam").value = "10000";
    document.getElementById("observaciones").value = "Observaciones registradas";
}

function modificarFormulario(){
    document.getElementById('formulario').innerHTML = '<form action="/modificarRegistro" method="POST">' + estrucForm + '<button class="btn-registros" id="btn-crearR" type="submit">Crear nuevo registro</button></div></form>';
    cargarDatos();
}