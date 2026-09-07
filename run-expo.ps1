$env:EXPO_ROUTER_APP_ROOT = "app"
$env:EXPO_NO_DOCTOR = "1"
$env:EXPO_NO_DEPENDENCY_VALIDATION = "1"
$env:EXPO_WEB_PORT = "19007"
$env:EXPO_NO_TUNNEL = "1"
$env:NODE_PATH = "C:\Users\shaida\Desktop\kaytx-full-app\node_modules"

Set-Location "C:\Users\shaida\Desktop\kaytx-full-app"

# The @expo/cli needs expo resolvable, add node_modules to NODE_PATH
node -e "
  process.env.EXPO_ROUTER_APP_ROOT = 'app';
  process.env.EXPO_NO_DOCTOR = '1';
  process.env.EXPO_NO_DEPENDENCY_VALIDATION = '1';
  process.env.EXPO_WEB_PORT = '19007';
  process.env.EXPO_NO_TUNNEL = '1';
  require('@expo/cli/build/bin/cli');
" -- start --web --clear
