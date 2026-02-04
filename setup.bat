@echo off
REM Pixel Wars - Setup Script for Windows

echo 🎨 Pixel Wars - Setup
echo ================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed
    exit /b 1
)

echo ✅ Node.js is installed
node --version
npm --version
echo.

REM Install root dependencies
echo 📦 Installing root dependencies...
call npm install

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd backend
call npm install
cd ..

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd frontend
call npm install
cd ..

echo ✅ Setup completed!
echo.
echo To start the development server, run:
echo npm run dev
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
