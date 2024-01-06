@echo off

REM Abrir el navegador en localhost:3000
start "" "http://localhost:3000"

REM Ejecutar el servidor Node.js en segundo plano con pm2
pm2 start servidor.js --name MiServidor

REM Esperar unos segundos para asegurarse de que el servidor esté en funcionamiento
timeout /t 2

echo Servidor iniciado y navegador abierto.

exit
