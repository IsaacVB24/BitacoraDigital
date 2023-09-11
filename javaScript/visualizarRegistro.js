function visualizar(){
    //readonly onmousedown="return false;"
    const cuadro = document.getElementsByTagName("input");
    for(let i=0; i<cuadro.length;i++){
        cuadro[i].readOnly = true;
        cuadro[i].onmousedown = "return false";
    }
}