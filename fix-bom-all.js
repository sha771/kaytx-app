const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const p = path.join(dir, file);
    if (fs.statSync(p).isDirectory()) {
      results = results.concat(walk(p));
    } else if (p.endsWith('.tsx')) {
      results.push(p);
    }
  }
  return results;
}

// Fix BOM in all tsx files under app/
const appFiles = walk('app');
let fixed = 0;
for (const f of appFiles) {
  const buf = fs.readFileSync(f);
  if (buf.length >= 3 && buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF) {
    fs.writeFileSync(f, buf.slice(3));
    fixed++;
    console.log('Fixed BOM:', f);
  }
}
console.log('BOM files fixed:', fixed);
console.log('Total .tsx files scanned:', appFiles.length);

// Check for empty/broken files
let emptyCount = 0;
for (const f of appFiles) {
  const content = fs.readFileSync(f, 'utf-8');
  if (content.trim().length === 0) {
    console.log('EMPTY FILE:', f);
    emptyCount++;
  }
}
console.log('Empty files:', emptyCount);

// Verify babel.config.js exists
if (fs.existsSync('babel.config.js')) {
  console.log('babel.config.js: EXISTS');
} else {
  console.log('babel.config.js: MISSING!');
}
