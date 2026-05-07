const fs = require('fs');
const path = require('path');

// Fix LinearGradient syntax errors across all agent directories
const base = path.join(__dirname, '..', 'app', 'ai-agent');
const dirs = fs.readdirSync(base).filter(d => fs.statSync(path.join(base, d)).isDirectory());

let fixed = 0;

dirs.forEach(dir => {
  const dirPath = path.join(base, dir);
  fs.readdirSync(dirPath).forEach(file => {
    if (!file.endsWith('.tsx')) return;
    const fp = path.join(dirPath, file);
    let content = fs.readFileSync(fp, 'utf8');
    let changed = false;

    // Fix: LinearGradient ={[  →  LinearGradient colors={[
    if (content.includes('LinearGradient ={[')) {
      content = content.replace(/LinearGradient =\{/g, 'LinearGradient colors={');
      changed = true;
    }

    // Fix: LinearGradient colors={{[  →  LinearGradient colors={[
    if (content.includes('colors={{[')) {
      content = content.replace(/colors=\{\{\[/g, 'colors={[');
      changed = true;
    }

    // Fix: LinearGradient colors={[[  →  LinearGradient colors={[
    if (content.includes('colors={[[')) {
      content = content.replace(/colors=\[\[\[/g, 'colors={[');
      changed = true;
    }

    // Fix: colors={[[  (double bracket after our previous bad fix)
    // Match patterns like colors={[[  or colors={{[
    if (content.match(/colors=\{\{?\[/)) {
      content = content.replace(/colors=\{\{?\[/g, 'colors={[');
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(fp, content, 'utf8');
      fixed++;
      console.log(`Fixed: ${dir}/${file}`);
    }
  });

  // Also check sub-agents subdirectory
  const subDir = path.join(dirPath, 'sub-agents');
  if (fs.existsSync(subDir)) {
    fs.readdirSync(subDir).forEach(file => {
      if (!file.endsWith('.tsx')) return;
      const fp = path.join(subDir, file);
      let content = fs.readFileSync(fp, 'utf8');
      let changed = false;

      if (content.includes('LinearGradient ={[')) {
        content = content.replace(/LinearGradient =\{/g, 'LinearGradient colors={');
        changed = true;
      }
      if (content.match(/colors=\{\{?\[/)) {
        content = content.replace(/colors=\{\{?\[/g, 'colors={[');
        changed = true;
      }

      if (changed) {
        fs.writeFileSync(fp, content, 'utf8');
        fixed++;
        console.log(`Fixed: ${dir}/sub-agents/${file}`);
      }
    });
  }
});

// Also fix tabs directory
const tabsDir = path.join(__dirname, '..', 'app', '(tabs)');
if (fs.existsSync(tabsDir)) {
  fs.readdirSync(tabsDir).forEach(file => {
    if (!file.endsWith('.tsx')) return;
    const fp = path.join(tabsDir, file);
    let content = fs.readFileSync(fp, 'utf8');
    let changed = false;

    if (content.includes('LinearGradient ={[')) {
      content = content.replace(/LinearGradient =\{/g, 'LinearGradient colors={');
      changed = true;
    }
    if (content.match(/colors=\{\{?\[/)) {
      content = content.replace(/colors=\{\{?\[/g, 'colors={[');
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(fp, content, 'utf8');
      fixed++;
      console.log(`Fixed: (tabs)/${file}`);
    }
  });
}

console.log(`\nTotal fixed: ${fixed} files`);
