@echo off
chcp 65001 >nul
title OneReserve - Servidor local
cd /d "%~dp0"

echo ===============================================
echo    OneReserve - iniciando entorno local
echo ===============================================
echo.

REM 1) Comprobar que Node.js esta instalado
where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] No se encuentra Node.js.
  echo Instalalo desde https://nodejs.org y vuelve a ejecutar este archivo.
  echo.
  pause
  exit /b 1
)

REM 2) Instalar dependencias la primera vez
if not exist "node_modules" (
  echo Instalando dependencias por primera vez. Esto puede tardar 1-2 minutos...
  echo.
  call npm install
  if errorlevel 1 (
    echo.
    echo [ERROR] Fallo la instalacion de dependencias.
    pause
    exit /b 1
  )
)

REM 3) Abrir el navegador en cuanto el servidor este listo (sin bloquear)
start "" cmd /c "timeout /t 4 /nobreak >nul & start http://localhost:5173"

echo.
echo La pagina se abrira en: http://localhost:5173
echo Para DETENER el servidor: pulsa Ctrl + C en esta ventana.
echo.

REM 4) Arrancar el servidor de desarrollo (se queda en ejecucion)
call npm run dev

echo.
echo El servidor se ha detenido.
pause
