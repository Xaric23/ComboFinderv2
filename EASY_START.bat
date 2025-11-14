@echo off
title MTG Combo Finder - Starting Server...
color 0A

echo.
echo ========================================
echo   MTG COMBO FINDER
echo ========================================
echo.
echo Starting local web server...
echo.

cd /d "%~dp0"

:: Try npx http-server first (fastest if you have npm)
where npx >nul 2>&1
if %errorlevel% equ 0 (
    echo Using npx http-server...
    echo.
    echo Opening http://localhost:8080 in your browser...
    echo.
    echo KEEP THIS WINDOW OPEN while using the app!
    echo Press Ctrl+C to stop the server.
    echo.
    timeout /t 2 /nobreak >nul
    start http://localhost:8080
    cd dist
    npx -y http-server -p 8080 -c-1
    exit /b
)

:: Try Python 3
where python >nul 2>&1
if %errorlevel% equ 0 (
    python --version 2>&1 | findstr "Python 3" >nul
    if %errorlevel% equ 0 (
        echo Using Python 3...
        echo.
        echo Opening http://localhost:8080 in your browser...
        echo.
        echo KEEP THIS WINDOW OPEN while using the app!
        echo Press Ctrl+C to stop the server.
        echo.
        timeout /t 2 /nobreak >nul
        start http://localhost:8080
        cd dist
        python -m http.server 8080
        exit /b
    )
)

:: Try Python 2
where python >nul 2>&1
if %errorlevel% equ 0 (
    echo Using Python 2...
    echo.
    echo Opening http://localhost:8080 in your browser...
    echo.
    echo KEEP THIS WINDOW OPEN while using the app!
    echo Press Ctrl+C to stop the server.
    echo.
    timeout /t 2 /nobreak >nul
    start http://localhost:8080
    cd dist
    python -m SimpleHTTPServer 8080
    exit /b
)

:: Try Node.js directly
where node >nul 2>&1
if %errorlevel% equ 0 (
    echo Using Node.js...
    echo Creating simple server...
    cd dist
    (
        echo const http = require('http'^);
        echo const fs = require('fs'^);
        echo const path = require('path'^);
        echo const server = http.createServer((req, res^) =^> {
        echo   let filePath = '.' + req.url;
        echo   if (filePath === './'^ ) filePath = './index.html';
        echo   const extname = path.extname(filePath^);
        echo   let contentType = 'text/html';
        echo   if (extname === '.js'^ ) contentType = 'text/javascript';
        echo   if (extname === '.css'^ ) contentType = 'text/css';
        echo   fs.readFile(filePath, (err, content^) =^> {
        echo     if (err^ ) { res.writeHead(404^); res.end('Not found'^); return; }
        echo     res.writeHead(200, { 'Content-Type': contentType }^);
        echo     res.end(content, 'utf-8'^);
        echo   }^);
        echo }^);
        echo server.listen(8080, (^) =^> console.log('Server at http://localhost:8080'^)^);
    ) > server.js
    start http://localhost:8080
    node server.js
    exit /b
)

:: No server found
echo.
echo ========================================
echo   ERROR: No server available!
echo ========================================
echo.
echo You need ONE of these installed:
echo   - Node.js (recommended^) - nodejs.org
echo   - Python - python.org
echo.
echo After installing, run this script again.
echo.
echo OR use a browser extension:
echo   - "Web Server for Chrome"
echo   - "Live Server" for VS Code
echo.
pause
exit /b 1
