@echo off
echo.
echo ======================================
echo   MTG Combo Finder - Local Server
echo ======================================
echo.
echo Starting local web server...
echo.

cd /d "%~dp0"

:: Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Python not found! Trying with Node.js...
    
    :: Check if Node is installed
    node --version >nul 2>&1
    if %errorlevel% neq 0 (
        echo.
        echo ERROR: Neither Python nor Node.js found!
        echo Please install one of them or use START_APP.bat instead.
        echo.
        pause
        exit /b
    )
    
    :: Use Node.js http-server
    echo Using Node.js...
    cd dist
    npx -y http-server -p 8000 -o
) else (
    :: Use Python http server
    echo Using Python...
    cd dist
    echo.
    echo Opening browser at: http://localhost:8000
    echo.
    start http://localhost:8000
    python -m http.server 8000
)
