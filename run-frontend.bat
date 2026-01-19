@echo off
REM Frontend - npm install ve dev server başlatma

cd /d "%~dp0"

echo Installing dependencies...
call npm install --legacy-peer-deps

if errorlevel 1 (
    echo NPM install failed!
    exit /b 1
)

echo.
echo ============================================================
echo Frontend setup tamamlandı!
echo ============================================================
echo.
echo Vite dev server başlatılıyor...
echo Open browser: http://localhost:3000
echo.

call npm run dev
