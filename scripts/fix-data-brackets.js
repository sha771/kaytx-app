/**
 * Fix const x = {[{ → const x = [{ (broken data arrays from old generation script)
 * Only targets variable declarations, not JSX props
 */
const fs = require('fs');
const path = require('path');

function walk(dir) {
  let r = [];
  try {
    fs.readdirSync(dir).forEach(f => {
      const fp = path.join(dir, f);
      try {
        if (fs.statSync(fp).isDirectory() && !f.startsWith('.') && f !== 'node_modules' && f !== 'coverage' && f !== 'dist' && f !== '.expo' && f !== '__tests__') {
          r = r.concat(walk(fp));
        } else if (f.endsWith('.tsx') || f.endsWith('.ts')) {
          r.push(fp);
        }
      } catch(e) {}
    });
  } catch(e) {}
  return r;
}

const files = walk('app').concat(walk('components'));
let fixed = 0;

files.forEach(fp => {
  let c = fs.readFileSync(fp, 'utf8');
  const orig = c;

  // Fix: const x = {[{ → const x = [{
  // This pattern occurs when the old generation script wrote {[{ instead of [{
  c = c.replace(/(const\s+\w+\s*=\s*)\{\[\{/g, '$1[{');
  c = c.replace(/((?:let|var)\s+\w+\s*=\s*)\{\[\{/g, '$1[{');

  if (c !== orig) {
    fs.writeFileSync(fp, c);
    fixed++;
    console.log('Fixed:', fp);
  }
});

console.log('Total fixed:', fixed);
