const fs = require('fs');
const path = require('path');

const packageDir = path.join(
  __dirname,
  '..',
  'node_modules',
  '@react-native',
  'debugger-frontend'
);
const packageJsonPath = path.join(packageDir, 'package.json');
const entryPath = path.join(packageDir, 'index.js');
const distPath = path.join(packageDir, 'dist');

if (!fs.existsSync(packageJsonPath)) {
  console.log('Skipping debugger frontend patch: package not installed.');
  process.exit(0);
}

if (!fs.existsSync(distPath)) {
  console.error('Cannot patch debugger frontend: dist folder is missing.');
  process.exit(1);
}

if (fs.existsSync(entryPath)) {
  console.log('Debugger frontend patch not needed: index.js already exists.');
  process.exit(0);
}

const entrySource = `'use strict';\n\nmodule.exports = require('path').join(__dirname, 'dist');\n`;
fs.writeFileSync(entryPath, entrySource, 'utf8');
console.log('Patched @react-native/debugger-frontend with a generated index.js entry point.');
