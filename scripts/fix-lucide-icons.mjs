import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const cjsDir = join(root, 'node_modules/lucide-react-native/dist/cjs/icons');
const esmDir = join(root, 'node_modules/lucide-react-native/dist/esm/icons');
const esmBarrel = join(root, 'node_modules/lucide-react-native/dist/esm/lucide-react-native.js');

// Patch CJS files: add module.exports.default = IconName;
let cjsCount = 0;
for (const file of readdirSync(cjsDir)) {
  if (!file.endsWith('.js') || file.endsWith('.js.map')) continue;
  const fp = join(cjsDir, file);
  let content = readFileSync(fp, 'utf-8');
  if (content.includes('module.exports.default')) continue; // already patched
  // Extract icon variable name from "const IconName = createLucideIcon(...)"
  const match = content.match(/^const\s+(\w+)\s*=\s*createLucideIcon/m);
  if (!match) continue;
  const varName = match[1];
  content = content.replace(
    'module.exports = ' + varName + ';',
    `module.exports = ${varName};\nmodule.exports.default = ${varName};`
  );
  writeFileSync(fp, content, 'utf-8');
  cjsCount++;
}

// Patch ESM files: add named export alongside default
let esmCount = 0;
for (const file of readdirSync(esmDir)) {
  if (!file.endsWith('.js') || file.endsWith('.js.map')) continue;
  const fp = join(esmDir, file);
  let content = readFileSync(fp, 'utf-8');
  if (content.includes('as default, ')) continue; // already has named export
  // Extract icon variable name from "const IconName = createLucideIcon(...)"
  const match = content.match(/^const\s+(\w+)\s*=\s*createLucideIcon/m);
  if (!match) continue;
  const varName = match[1];
  content = content.replace(
    `export { ${varName} as default };`,
    `export { ${varName} as default, ${varName} };`
  );
  writeFileSync(fp, content, 'utf-8');
  esmCount++;
}

console.log(`Patched ${cjsCount} CJS icon files`);
console.log(`Patched ${esmCount} ESM icon files`);

// Also update the ESM barrel to use named re-exports instead of "default as"
let barrelContent = readFileSync(esmBarrel, 'utf-8');
let barrelCount = 0;
// Replace "export { default as IconName } from './icons/icon-name.js'"
// with "export { IconName, IconName as IconNameIcon, IconName as LucideIconName } from './icons/icon-name.js'"
// Actually, the simplest fix that's most compatible: just re-export the named export
// Since we added named export to each icon file, we can switch to named re-exports
barrelContent = barrelContent.replace(
  /export\s*\{\s*default\s+as\s+(\w+)\s*\}\s*from\s*(['"])(\.\/icons\/[\w-]+\.js)\2\s*;/g,
  (match, name, quote, path) => {
    barrelCount++;
    return `export { ${name} as ${name} } from ${quote}${path}${quote};`;
  }
);
writeFileSync(esmBarrel, barrelContent, 'utf-8');
console.log(`Updated ${barrelCount} re-exports in ESM barrel`);
