/**
 * Fix ChartBarBig3 → BarChart3 across all operations agent pages
 * ChartBarBig3 doesn't exist in lucide-react-native; the correct name is BarChart3
 */
const fs = require('fs');
const path = require('path');
const glob = require('glob') || null;

function walkDir(dir, callback) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath, callback);
    } else if (entry.isFile() && entry.name.endsWith('.tsx')) {
      callback(fullPath);
    }
  }
}

const baseDir = 'c:/Users/shaida/Desktop/kaytx-full-app/app/ai-agent/operations';
let fixedCount = 0;

walkDir(baseDir, (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('ChartBarBig3')) {
    // Replace usage
    content = content.replace(/ChartBarBig3/g, 'BarChart3');
    // Fix import: if BarChart3 is already imported, remove the duplicate
    // If not, add it
    const importMatch = content.match(/from 'lucide-react-native'/);
    if (importMatch) {
      // Check if BarChart3 is already in the import
      const importLine = content.substring(0, importMatch.index + importMatch[0].length);
      if (importLine.includes('BarChart3')) {
        // Already has BarChart3, just remove ChartBarBig3 from import if it's still there
        content = content.replace(/,\s*ChartBarBig3/g, '');
        content = content.replace(/ChartBarBig3\s*,\s*/g, '');
      }
      // ChartBarBig3 was already replaced with BarChart3 above, so the import should now have BarChart3
    }
    fs.writeFileSync(filePath, content);
    fixedCount++;
    console.log('Fixed: ' + path.relative(baseDir, filePath));
  }
});

console.log('\nFixed ' + fixedCount + ' files.');
