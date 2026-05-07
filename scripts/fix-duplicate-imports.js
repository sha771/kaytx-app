const fs = require('fs');
const path = require('path');

const appDir = path.join('c:', 'Users', 'shaida', 'Desktop', 'kaytx-full-app', 'app');

function walk(dir) {
  let results = [];
  fs.readdirSync(dir).forEach(f => {
    const fp = path.join(dir, f);
    if (fs.statSync(fp).isDirectory()) {
      if (f !== 'node_modules' && f !== '.git' && f !== 'coverage' && f !== 'dist') {
        results = results.concat(walk(fp));
      }
    } else if (f.endsWith('.tsx')) {
      results.push(fp);
    }
  });
  return results;
}

const files = walk(appDir);
let fixed = 0;

files.forEach(fp => {
  let c = fs.readFileSync(fp, 'utf8');
  let changed = false;

  // Find lucide import lines and check for duplicates
  const lines = c.split('\n');
  const newLines = [];
  let inLucideImport = false;
  let lucideImportLines = [];
  let lucideStartIdx = -1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes("from 'lucide-react-native'") || line.includes('from "lucide-react-native"')) {
      // This line closes the import - collect all lucide import lines
      lucideImportLines.push(line);
      
      // Parse all identifiers from the lucide import block
      const fullImport = lucideImportLines.join(' ');
      const match = fullImport.match(/\{([^}]+)\}/);
      if (match) {
        const identifiers = match[1].split(',').map(s => s.trim()).filter(s => s.length > 0);
        const seen = new Set();
        const unique = [];
        for (const id of identifiers) {
          if (!seen.has(id)) {
            seen.add(id);
            unique.push(id);
          } else {
            changed = true;
          }
        }
        if (changed) {
          // Reconstruct the import
          const importPrefix = fullImport.substring(0, fullImport.indexOf('{'));
          const newImport = importPrefix + '{ ' + unique.join(', ') + ' }' + " from 'lucide-react-native';";
          newLines.push(newImport);
          lucideImportLines = [];
          inLucideImport = false;
          continue;
        }
      }
      lucideImportLines = [];
      inLucideImport = false;
      newLines.push(line);
    } else if (inLucideImport || (line.includes('lucide-react-native') && !line.includes('from'))) {
      // Continuation of lucide import
      if (!inLucideImport) {
        inLucideImport = true;
        lucideStartIdx = newLines.length;
      }
      lucideImportLines.push(line);
    } else {
      newLines.push(line);
    }
  }

  if (changed) {
    c = newLines.join('\n');
    fs.writeFileSync(fp, c, 'utf8');
    fixed++;
    console.log('Fixed: ' + path.relative(appDir, fp));
  }
});

console.log('\nTotal: ' + fixed + ' files');
