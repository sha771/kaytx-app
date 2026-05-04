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
const fixedFiles = [];
const skippedFiles = [];

for (const file of files) {
  try {
    let content = fs.readFileSync(file, 'utf8');
    
    // Check if ChartBarBig is used
    if (content.includes('ChartBarBig')) {
      // Check if it's already imported from lucide-react-native
      const lucideImportMatch = content.match(/from\s+['"`]lucide-react-native['"`]/);
      if (lucideImportMatch) {
        // Get the import statement
        const importStart = content.lastIndexOf('import', lucideImportMatch.index);
        const importEnd = content.indexOf(';', lucideImportMatch.index);
        const importStatement = content.substring(importStart, importEnd + 1);
        
        if (!importStatement.includes('ChartBarBig')) {
          // Find where to insert ChartBarBig (alphabetically after ChartBar if present)
          if (importStatement.includes('ChartBar,')) {
            const newImport = importStatement.replace('ChartBar,', 'ChartBar, ChartBarBig,');
            content = content.substring(0, importStart) + newImport + content.substring(importEnd + 1);
            fs.writeFileSync(file, content);
            fixedFiles.push(file);
          } else if (importStatement.includes('ChartBar}')) {
            const newImport = importStatement.replace('ChartBar}', 'ChartBar, ChartBarBig}');
            content = content.substring(0, importStart) + newImport + content.substring(importEnd + 1);
            fs.writeFileSync(file, content);
            fixedFiles.push(file);
          } else {
            // Just add ChartBarBig before the closing brace
            const newImport = importStatement.replace(/} from/, 'ChartBarBig, } from');
            content = content.substring(0, importStart) + newImport + content.substring(importEnd + 1);
            fs.writeFileSync(file, content);
            fixedFiles.push(file);
          }
        } else {
          skippedFiles.push(file + ' (already has import)');
        }
      } else {
        skippedFiles.push(file + ' (no lucide import found)');
      }
    }
  } catch (e) {
    skippedFiles.push(file + ' (error: ' + e.message + ')');
  }
}

console.log('Fixed files:');
fixedFiles.forEach(f => console.log('  ' + f));
console.log('\nTotal fixed:', fixedFiles.length);
console.log('\nSkipped files:');
skippedFiles.forEach(f => console.log('  ' + f));
console.log('\nTotal skipped:', skippedFiles.length);
