@echo off
echo Initialising git and pushing to GitHub...
cd /d "%~dp0"
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/mckaymichael/orourke-audio.git
git push -u origin main
echo.
echo Done! Check https://github.com/mckaymichael/orourke-audio
pause
