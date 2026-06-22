const fs = require('fs');
const path = process.argv[2];
if (!path) { console.error('Usage: node find-bad-chars.js <file>'); process.exit(2); }
const src = fs.readFileSync(path, 'utf8');
const lines = src.split(/\r?\n/);
console.log('Total lines:', lines.length);
let problems = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (let j = 0; j < line.length; j++) {
    const code = line.charCodeAt(j);
    if (code === 0xFEFF) {
      console.log(`BOM at line ${i+1}, column ${j+1}`);
      problems++;
    } else if (code > 127 && code <= 160) {
      console.log(`Control/extended char (code ${code}) at line ${i+1}, column ${j+1}: ${JSON.stringify(line[j])}`);
      problems++;
    } else if (code === 8232 || code === 8233) {
      console.log(`Unicode line separator at line ${i+1}, column ${j+1} (code ${code})`);
      problems++;
    }
  }
}
if (problems === 0) console.log('No suspicious characters found');
process.exit(problems>0?1:0);
