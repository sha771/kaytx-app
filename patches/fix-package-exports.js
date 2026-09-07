/**
 * Script to fix package.json exports configuration in node_modules
 * This resolves issues where pnpm symlinks point to non-existent files
 */

const fs = require('fs');
const path = require('path');

// Specific packages to fix (from the error messages)
const packagesToFix = [
  'zustand',
  '@trpc/client',
  '@trpc/react-query',
  'merge-options',
  '@ai-sdk/react'
];

function findPnpmPackagePath(pkgName) {
  const pnpmDir = path.join(__dirname, '..', 'node_modules', '.pnpm');
  
  if (!fs.existsSync(pnpmDir)) {
    return null;
  }
  
  // Convert @scope/name to scope+name for pnpm directory matching
  const pnpmName = pkgName.replace('@', '').replace('/', '+');
  
  const entries = fs.readdirSync(pnpmDir);
  
  for (const entry of entries) {
    if (entry.includes(pnpmName)) {
      const pkgPath = path.join(pnpmDir, entry, 'node_modules', pkgName);
      if (fs.existsSync(pkgPath)) {
        return pkgPath;
      }
    }
  }
  
  return null;
}

function fixPackage(pkgName) {
  // Check in main node_modules first
  const mainPath = path.join(__dirname, '..', 'node_modules', pkgName);
  const pnpmPath = findPnpmPackagePath(pkgName);
  
  const pathsToTry = [mainPath, pnpmPath].filter(Boolean);
  
  for (const pkgPath of pathsToTry) {
    const pkgJsonPath = path.join(pkgPath, 'package.json');
    
    if (fs.existsSync(pkgJsonPath)) {
      try {
        const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
        
        if (pkg.exports) {
          // Remove exports to allow file-based resolution
          delete pkg.exports;
          fs.writeFileSync(pkgJsonPath, JSON.stringify(pkg, null, 2) + '\n');
          console.log(`Fixed ${pkgName} at ${pkgPath}`);
        }
      } catch (error) {
        console.error(`Error fixing ${pkgName}:`, error.message);
      }
    }
  }
}

console.log('Fixing package.json exports configuration...\n');
packagesToFix.forEach(fixPackage);
console.log('\nDone!');