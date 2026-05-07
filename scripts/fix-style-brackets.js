/**
 * Fix the damage from the aggressive ={[ → = [ replacement
 * 1. Restore style= [ → style={[ (valid JSX)
 * 2. Fix const x = {[{ → const x = [{ (broken data arrays only)
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

  // Step 1: Restore style= [ back to style={[ (undo damage)
  c = c.replace(/style=\s*\[/g, 'style={');

  // Step 2: Restore source= [ back to source={[ 
  // (not needed, source uses uri prop)

  // Step 3: Fix the original bug - const x = {[{ → const x = [{
  // This is the ONLY pattern that was actually broken
  c = c.replace(/(const\s+\w+\s*=\s*)\{\[/g, '$1[');
  c = c.replace(/((?:let|var)\s+\w+\s*=\s*)\{\[/g, '$1[');

  if (c !== orig) {
    fs.writeFileSync(fp, c);
    fixed++;
  }
});

console.log('Total fixed:', fixed);
