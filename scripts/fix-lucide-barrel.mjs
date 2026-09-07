import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const esmBarrel = join(root, 'node_modules/lucide-react-native/dist/esm/lucide-react-native.js');

// Helper: convert kebab-case filename to PascalCase icon name
// e.g., "a-arrow-down.js" -> "AArrowDown", "shield-check.js" -> "ShieldCheck"
function kebabToPascal(str) {
  return str
    .replace(/\.js$/, '')
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

let content = readFileSync(esmBarrel, 'utf-8');
let count = 0;

// Match lines like: export { default as Name, ... } from './icons/icon-name.js';
const lineRegex = /^export\s*\{\s*(.*?)\s*\}\s*from\s*(['"])(\.\/icons\/([\w-]+\.js))\2\s*;$/gm;

content = content.replace(lineRegex, (match, specifiers, quote, path, iconFile) => {
  // Get the actual icon variable name (PascalCase)
  const iconVar = kebabToPascal(iconFile);
  
  // Replace every "default as ExportName" with "iconVar as ExportName"
  const newSpecifiers = specifiers.replace(/default\s+as\s+(\w+)/g, (m, exportName) => {
    return `${iconVar} as ${exportName}`;
  });
  
  count++;
  return `export { ${newSpecifiers} } from ${quote}${path}${quote};`;
});

writeFileSync(esmBarrel, content, 'utf-8');
console.log(`Updated ${count} re-export lines in ESM barrel`);
