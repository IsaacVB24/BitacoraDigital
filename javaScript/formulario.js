function crearFormulario(){
    document.getElementById('formulario').innerHTML = "<div id='fila1'><div><label for='nomUs'>Nombre de usuario:</label><input type='text' name='nomUs' id='nomUs' maxlength='20' placeholder='Ingrese nombre de usuario'></div><div><label for='numSol'>Número de solicitud:</label><input type='text' name='numSol' id='numSol' placeholder='Ingrese número de solicitud'></div></div><div id='fila2'><div><label for='clavMues'>Clave de muestra:</label><input type='text' name='clavMues' id='clavMues' placeholder='Ingrese máximo 15 claves separados por coma'></div><div><label for='fuenEmpl'>Fuentes empleadas:</label><input type='text' name='fuenEmpl' id='fuenEmpl' placeholder='Ingrese las fuentes empleadas'></div></div><div id='fila3'><div><label for='durAn'>Duración del análisis:</label><input type='number' name='durAn' id='hdurAn' placeholder='HH' min='0' max='999'> : <input type='number' name='durAn' id='mdurAn' placeholder='MM' min='1' max='59'></div><div><label for='xfti'>Tiempo de vida de filamentos de rayos X (XFTI):</label><input type='number' name='xfti' id='hxfti' placeholder='HH' min='0' max='9999'> : <input type='number' name='xfti' id='mxfti' placeholder='MM' min='1' max='59'></div><div><label for='presCam'>Presión en cámara de análisis (mbar):</label><input type='number' name='presCam' id='presCam' placeholder='Presión en mbar'></div></div><div id='fila4'><label for='observaciones'>Observaciones y/o eventos:</label><textarea name='observaciones' id='observaciones' cols='30' rows='5' placeholder='En caso de haber comentarios, colocarlos aquí.'></textarea></div>";
}

function visFormulario(){
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
    cargarDatos();
}