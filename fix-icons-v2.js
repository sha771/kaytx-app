const fs = require('fs');
const path = require('path');

// Get valid icons from the icons directory
const iconsDir = path.join('node_modules', 'lucide-react-native', 'dist', 'esm', 'icons');
const files = fs.readdirSync(iconsDir).filter(f => f.endsWith('.js')).map(f => f.replace('.js', ''));
const validIcons = new Set(files.map(f => f.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')));

console.log('Valid icons count:', validIcons.size);

// Read the file
const filePath = 'app/ai-agent/kaytxx-workforce.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Find all imports from lucide-react-native
const importRegex = /import\s*\{([^}]+)\}\s*from\s*'lucide-react-native'/;
const importMatch = content.match(importRegex);

if (!importMatch) {
  console.log('No lucide imports found');
  process.exit(0);
}

const importBlock = importMatch[1];
const imports = importBlock.split(',').map(s => s.trim()).filter(Boolean);

const validImports = [];
const invalidImports = [];

for (const imp of imports) {
  const parts = imp.split(/\s+as\s+/);
  const name = parts[0].trim();
  const alias = parts.length > 1 ? parts[1].trim() : null;
  
  if (validIcons.has(name)) {
    validImports.push(imp);
  } else {
    invalidImports.push({ name, alias, original: imp });
  }
}

console.log('Valid imports:', validImports.length);
console.log('Invalid imports:', invalidImports.length);

// For invalid imports, use Circle as fallback
const fallbackIcon = 'Circle';
const replacements = invalidImports.map(imp => {
  if (imp.alias) {
    return fallbackIcon + ' as ' + imp.alias;
  } else {
    return fallbackIcon + ' as ' + imp.name;
  }
});

// Combine valid and replacement imports
const allImports = [...validImports, ...replacements];

// Create new import statement
const newImport = "import {\n  " + allImports.join(",\n  ") + "\n} from 'lucide-react-native';";

// Replace the import in the content
const newContent = content.replace(importRegex, newImport);

// Write the file
fs.writeFileSync(filePath, newContent, 'utf8');
console.log('File updated successfully');
console.log('Total imports:', allImports.length);
console.log('Sample replacements:', invalidImports.slice(0, 10).map(i => i.original + ' -> ' + fallbackIcon + ' as ' + (i.alias || i.name)).join('\n'));
