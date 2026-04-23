const fs = require('fs');
const path = require('path');
const pjson = require('./package.json');
const deps = Object.keys(pjson.dependencies || {}).concat(Object.keys(pjson.devDependencies || {}));

function getAllFiles(dir, exts, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, exts, fileList);
    } else if (exts.includes(path.extname(filePath))) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const allFiles = getAllFiles('.', ['.ts', '.tsx', '.js', '.jsx'])
  .filter(f => !f.includes('node_modules') && !f.includes('.expo') && !f.includes('dist'));

const missing = new Set();
const importRegex = /from\s+['"]([^'"]+)['"]/g;
const requireRegex = /require\(['"]([^'"]+)['"]\)/g;

allFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const pkg = match[1];
    if (!pkg.startsWith('.') && !pkg.startsWith('@/') && !pkg.startsWith('~') && !path.isAbsolute(pkg)) {
       const pkgName = pkg.startsWith('@') ? pkg.split('/').slice(0, 2).join('/') : pkg.split('/')[0];
       if (!deps.includes(pkgName) && pkgName !== 'react' && pkgName !== 'expo') {
         missing.add(pkgName);
       }
    }
  }
});
console.log(Array.from(missing).join(' '));
