const fs = require('fs');
const path = require('path');
const lucideDir = path.join(process.cwd(), 'node_modules/lucide-react-native');

// Get valid icon names
let validIcons = new Set();
try {
  const dts = fs.readFileSync(path.join(lucideDir, 'dist', 'lucide-react-native.d.ts'), 'utf8');
  const matches = dts.match(/export \{[^}]+\}/g) || [];
  matches.forEach(m => {
    const names = m.match(/\b[A-Z][a-zA-Z0-9]+\b/g) || [];
    names.forEach(n => { if (!n.startsWith('Lucide')) validIcons.add(n); });
  });
} catch(e) { console.error('Error reading d.ts:', e.message); }

console.log('Valid icons:', validIcons.size);

// Read the file
const filePath = path.join(process.cwd(), 'app/ai-agent/kaytxx-workforce.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Find all imports from lucide-react-native
const importRegex = /import\s*\{([^}]+)\}\s*from\s*['"]lucide-react-native['"];?/g;
let match;
let allReplacements = [];
let fixedContent = content;

while ((match = importRegex.exec(content)) !== null) {
  const imports = match[1].split(',').map(s => s.trim()).filter(Boolean);
  imports.forEach(imp => {
    const parts = imp.split(/\s+as\s+/);
    const originalName = parts[0].trim();
    const alias = parts.length > 1 ? parts[1].trim() : originalName;
    
    if (!validIcons.has(originalName)) {
      allReplacements.push({ original: imp, name: originalName, alias });
    }
  });
}

console.log('Invalid imports found:', allReplacements.length);

// Replace invalid imports
allReplacements.forEach(({ original, name, alias }) => {
  // Replace exact import name in import block
  const safeName = original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(safeName, 'g');
  fixedContent = fixedContent.replace(regex, 'CircleDot as ' + alias);
});

// Add CircleDot to imports if not present
if (allReplacements.length > 0 && !fixedContent.match(/import\s*\{[^}]*CircleDot/)) {
  fixedContent = fixedContent.replace(/(import\s*\{)/, '$1\n  CircleDot,');
}

fs.writeFileSync(filePath, fixedContent, 'utf8');
console.log('Fixed file saved');
console.log('First 10 replacements:', allReplacements.slice(0, 10).map(i => i.original + ' -> CircleDot as ' + i.alias).join('\n'));
