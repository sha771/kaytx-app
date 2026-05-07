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
  
  // Find all lucide-react-native import lines
  const lines = c.split('\n');
  const lucideLines = [];
  const nonLucideLines = [];
  let hasDuplicate = false;
  
  const seen = new Set();
  
  lines.forEach(line => {
    if (line.includes("from 'lucide-react-native'") || line.includes('from "lucide-react-native"')) {
      // Extract identifiers
      const match = line.match(/\{([^}]+)\}/);
      if (match) {
        const ids = match[1].split(',').map(s => s.trim()).filter(s => s.length > 0);
        ids.forEach(id => {
          if (seen.has(id)) {
            hasDuplicate = true;
          } else {
            seen.add(id);
            lucideLines.push(id);
          }
        });
      }
    } else {
      nonLucideLines.push(line);
    }
  });
  
  if (hasDuplicate && lucideLines.length > 0) {
    // Reconstruct: put consolidated lucide import at the position of first lucide import
    const firstLucideIdx = lines.findIndex(l => l.includes("from 'lucide-react-native'") || l.includes('from "lucide-react-native"'));
    const beforeLucide = lines.slice(0, firstLucideIdx);
    const afterLastLucide = [];
    let lastLucideIdx = -1;
    for (let i = lines.length - 1; i >= 0; i--) {
      if (lines[i].includes("from 'lucide-react-native'") || lines[i].includes('from "lucide-react-native"')) {
        lastLucideIdx = i;
        break;
      }
    }
    const afterLucide = lines.slice(lastLucideIdx + 1);
    
    const consolidatedImport = `import { ${lucideLines.join(', ')} } from 'lucide-react-native';`;
    
    c = [...beforeLucide, consolidatedImport, ...afterLucide].join('\n');
    fs.writeFileSync(fp, c, 'utf8');
    fixed++;
    console.log('Fixed: ' + path.relative(appDir, fp));
  }
});

console.log('\nTotal: ' + fixed + ' files');
