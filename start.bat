@echo off

REM Ir al directorio donde se encuentra el servidor.js
cd "%~dp0BitacoraDigital"

REM Ejecutar el servidor Node.js en segundo plano
start node servidor.js

REM Esperar unos segundos para asegurarse de que el servidor esté en funcionamiento
timeout /t 2

REM Abrir el navegador en localhost:3000
start "" "http://localhost:3000"

echo Servidor iniciado y navegador abierto.
