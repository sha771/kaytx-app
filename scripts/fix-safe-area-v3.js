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

  // Fix: ={['bottom']}  →  edges={['bottom']}
  if (c.includes('={[\'bottom\']}')) {
    c = c.replace(/=\{\['\''bottom'\''\]\}/g, "edges={['bottom']}");
    changed = true;
  }
  // Fix: ={['top']}  →  edges={['top']}
  if (c.includes('={[\'top\']}')) {
    c = c.replace(/=\{\['\''top'\''\]\}/g, "edges={['top']}");
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(fp, c, 'utf8');
    fixed++;
    console.log('Fixed: ' + path.relative(appDir, fp));
  }
});

console.log('\nTotal: ' + fixed + ' files');
