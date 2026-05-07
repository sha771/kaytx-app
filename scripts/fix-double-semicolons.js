const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'app', 'ai-agent', 'trading');
let fixes = 0;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));
files.forEach(f => {
  let c = fs.readFileSync(path.join(dir, f), 'utf8');
  if (c.includes(';;')) {
    c = c.replace(/;;/g, ';');
    fs.writeFileSync(path.join(dir, f), c);
    fixes++;
    console.log(f + ': fixed double semicolons');
  }
});
// Also check sub-agents
const sdir = path.join(dir, 'sub-agents');
const sfiles = fs.readdirSync(sdir).filter(f => f.endsWith('.tsx'));
sfiles.forEach(f => {
  let c = fs.readFileSync(path.join(sdir, f), 'utf8');
  if (c.includes(';;')) {
    c = c.replace(/;;/g, ';');
    fs.writeFileSync(path.join(sdir, f), c);
    fixes++;
    console.log(f + ': fixed double semicolons');
  }
});
console.log('Total fixes:', fixes);
