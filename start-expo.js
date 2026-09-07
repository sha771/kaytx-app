process.env.EXPO_ROUTER_APP_ROOT = 'app';
process.env.EXPO_NO_DOCTOR = '1';
process.env.EXPO_NO_DEPENDENCY_VALIDATION = '1';
process.env.EXPO_WEB_PORT = '19007';
process.env.EXPO_NO_TUNNEL = '1';
require('./node_modules/expo/node_modules/@expo/cli/build/bin/cli');