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

  // Fix multi-line: LinearGradient\n        ={  →  LinearGradient\n        colors={
  if (c.match(/LinearGradient\s*\n\s*=\{/)) {
    c = c.replace(/LinearGradient(\s*\n\s*)=\{/g, 'LinearGradient$1colors={');
    changed = true;
  }

  // Fix single-line: LinearGradient ={  →  LinearGradient colors={
  if (c.includes('LinearGradient ={')) {
    c = c.replace(/LinearGradient =\{/g, 'LinearGradient colors={');
    changed = true;
  }

  // Fix any remaining colors={{ or colors={[[
  if (c.match(/colors=\{\{/)) {
    c = c.replace(/colors=\{\{/g, 'colors={');
    changed = true;
  }
  if (c.match(/colors=\{\[\[/)) {
    c = c.replace(/colors=\{\[\[/g, 'colors={[');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(fp, c, 'utf8');
    fixed++;
    console.log('Fixed: ' + path.relative(appDir, fp));
  }
});

console.log('\nTotal: ' + fixed + ' files');
