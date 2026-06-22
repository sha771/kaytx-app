const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const p = path.join(dir, file);
      if (fs.statSync(p).isDirectory()) {
        results = results.concat(walk(p));
      } else if (p.endsWith('.tsx') || p.endsWith('.ts')) {
        results.push(p);
      }
    }
  } catch (e) {}
  return results;
}

const files = walk('app');
let broken = 0;
const brokenFiles = [];

for (const f of files) {
  const content = fs.readFileSync(f, 'utf-8');
  let depth = 0;
  
  // Count braces (excluding those in strings - simple approximation)
  for (const ch of content) {
    if (ch === '{') depth++;
    if (ch === '}') depth--;
  }
  
  if (depth !== 0) {
    console.log(`UNBALANCED: ${f} (depth=${depth})`);
    broken++;
    brokenFiles.push({ file: f, depth });
  }
}

console.log(`\nTotal files scanned: ${files.length}`);
console.log(`Files with unbalanced braces: ${broken}`);

if (brokenFiles.length > 0) {
  console.log('\nBroken files:');
  for (const b of brokenFiles) {
    console.log(`  ${b.file}: depth=${b.depth}`);
  }
}
