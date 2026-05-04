const fs = require('fs');
const path = require('path');

function findTsxFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      files.push(...findTsxFiles(fullPath));
    } else if (item.endsWith('.tsx')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

const files = findTsxFiles('app');
const missingImports = [];

for (const file of files) {
  try {
    const content = fs.readFileSync(file, 'utf8');
    // Check if ChartBarBig is used
    if (content.includes('ChartBarBig')) {
      // Check if it's imported from lucide-react-native
      const lucideImportMatch = content.match(/from\s+['"`]lucide-react-native['"`]/);
      if (lucideImportMatch) {
        // Get the import statement
        const importStart = content.lastIndexOf('import', lucideImportMatch.index);
        const importEnd = content.indexOf(';', lucideImportMatch.index);
        const importStatement = content.substring(importStart, importEnd + 1);
        
        if (!importStatement.includes('ChartBarBig')) {
          missingImports.push(file);
        }
      }
    }
  } catch (e) {
    // Skip files that can't be read
  }
}

console.log('Files missing ChartBarBig import:');
missingImports.forEach(f => console.log(f));
console.log('\nTotal:', missingImports.length);
