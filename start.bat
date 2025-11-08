@echo off
echo 🩺 Starting Diabetes Diet Planner...
echo.

echo 📦 Installing Backend Dependencies...
cd backend
pip install -r requirements.txt

echo.
echo 🚀 Starting Backend Server...
start "Backend API" cmd /k "python run.py"

cd ..\frontend

echo.
echo 📦 Installing Frontend Dependencies...
call npm install

echo.
echo 🌐 Starting Frontend Server...
start "Frontend App" cmd /k "npm start"

echo.
echo ✅ Both servers are starting...
echo 🌐 Frontend: http://localhost:3000
echo 🔌 Backend: http://localhost:5000
echo.
pause