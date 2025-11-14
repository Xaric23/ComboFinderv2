@echo off
echo.
echo ======================================
echo   MTG Combo Finder - Troubleshooting
echo ======================================
echo.

cd /d "%~dp0dist"

echo Opening diagnostics page...
echo.
echo This will test:
echo - File integrity
echo - API connection
echo - Browser compatibility
echo.

start test.html

echo.
echo Diagnostics page opened!
echo Check the browser window for test results.
echo.
pause
