const fs = require('fs');
const path = require('path');

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fp = path.join(dir, file);
    const stat = fs.statSync(fp);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'coverage' && file !== 'dist') {
        results = results.concat(walkDir(fp));
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(fp);
    }
  });
  return results;
}

const appDir = path.join(__dirname, '..', 'app');
const files = walkDir(appDir);
let fixed = 0;

files.forEach(fp => {
  let content = fs.readFileSync(fp, 'utf8');
  let changed = false;

  // Fix: LinearGradient ={  →  LinearGradient colors={
  if (content.includes('LinearGradient =')) {
    content = content.replace(/LinearGradient =\{/g, 'LinearGradient colors={');
    changed = true;
  }

  // Fix any remaining double-bracket patterns: colors={{  or colors={[[
  if (content.match(/colors=\{\{/)) {
    content = content.replace(/colors=\{\{/g, 'colors={');
    changed = true;
  }
  if (content.match(/colors=\[\[/)) {
    content = content.replace(/colors=\[\[/g, 'colors=[');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(fp, content, 'utf8');
    fixed++;
    console.log('Fixed: ' + path.relative(appDir, fp));
  }
});

console.log('\nTotal fixed: ' + fixed + ' files');
