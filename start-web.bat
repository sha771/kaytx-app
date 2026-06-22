@echo off
cd /d c:\Users\shaida\Desktop\kaytx-full-app
set EXPO_ROUTER_APP_ROOT=app
set EXPO_NO_DOCTOR=1
set EXPO_NO_DEPENDENCY_VALIDATION=1
set EXPO_WEB_PORT=19007
npx expo start --web --clear --port 8086
