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

  // Fix: const stats = {[{label:  →  const stats = [{label:
  // This is in TypeScript variable declarations, not JSX
  if (c.match(/= \{\[\{/)) {
    c = c.replace(/= \{\[\{/g, '= [{');
    changed = true;
  }

  // Also fix any other patterns of double brace before array
  if (c.match(/= \{\[/)) {
    c = c.replace(/= \{\[/g, '= [{');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(fp, c, 'utf8');
    fixed++;
    console.log('Fixed: ' + path.relative(appDir, fp));
  }
});

console.log('\nTotal: ' + fixed + ' files');
