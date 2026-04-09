const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'node_modules', '@expo', 'cli', 'build', 'src');
const out = [];
function walk(d) {
  for (const name of fs.readdirSync(d)) {
    const p = path.join(d, name);
    const s = fs.statSync(p);
    if (s.isDirectory()) {
      walk(p);
    } else if (p.endsWith('.js')) {
      const t = fs.readFileSync(p, 'utf8');
      if (t.includes('WEB_PORT') || t.includes('webPort') || t.includes('PORT_WEB')) {
        out.push(p);
      }
    }
  }
}
walk(dir);
fs.writeFileSync(path.join(__dirname, 'expo-web-port-files.txt'), out.join('\n'));
console.log('Done, wrote', out.length, 'matches');
