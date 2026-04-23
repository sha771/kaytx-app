// Patch script to fix expo-router Windows path issue
const fs = require('fs');
const path = require('path');

const ctxFile = path.join(__dirname, '..', 'node_modules', 'expo-router', '_ctx.web.js');
const appRoot = path.resolve(__dirname, '..', 'app').replace(/\\/g, '/');

if (fs.existsSync(ctxFile)) {
  let content = fs.readFileSync(ctxFile, 'utf8');
  
  // Replace the dynamic env var with a static absolute path
  content = content.replace(
    'process.env.EXPO_ROUTER_APP_ROOT',
    JSON.stringify(appRoot)
  );
  
  fs.writeFileSync(ctxFile, content);
  console.log('✅ Patched expo-router/build/_ctx.web.js with absolute path:', appRoot);
} else {
  console.error('❌ Could not find expo-router/build/_ctx.web.js');
  process.exit(1);
}
