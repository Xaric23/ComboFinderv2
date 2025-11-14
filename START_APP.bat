@echo off
echo.
echo ======================================
echo   MTG Combo Finder
echo ======================================
echo.
echo Starting the app in your browser...
echo.

cd /d "%~dp0dist"
start index.html

echo.
echo App opened in your default browser!
echo.
echo If you see a WHITE SCREEN:
echo   1. Press F12 to open browser console
echo   2. Check for any red error messages
echo   3. Run TROUBLESHOOTING.bat for diagnostics
echo   4. Or use START_WITH_SERVER.bat instead
echo.
echo You can close this window now.
echo.
pause
