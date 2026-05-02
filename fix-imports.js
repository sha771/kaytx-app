const fs = require('fs');
const path = require('path');

function findTsxFiles(dir, files = []) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      findTsxFiles(fullPath, files);
    } else if (item.name.endsWith('.tsx')) {
      files.push(fullPath);
    }
  }
  return files;
}

const files = findTsxFiles('app/ai-agent');
let fixed = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  const orig = content;

  // If file uses icon: User but import doesn't include User, add it
  if (content.includes('icon: User') || content.includes('icon:User')) {
    const lucideImportMatch = content.match(/import\s*\{([^}]+)\}\s*from\s*['"]lucide-react-native['"]/);
    if (lucideImportMatch) {
      const imports = lucideImportMatch[1];
      if (!imports.includes('User')) {
        content = content.replace(
          /import\s*\{([^}]+)\}\s*from\s*['"]lucide-react-native['"]/,
          `import {$1, User} from 'lucide-react-native'`
        );
      }
    }
  }

  if (content !== orig) {
    fs.writeFileSync(file, content);
    console.log('Fixed imports:', file);
    fixed++;
  }
}

console.log('Total files fixed:', fixed);
