/**
 * Fix pnpm package.json exports for specific packages
 * This script directly fixes the packages mentioned in the error messages
 */

const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'node_modules', '.pnpm');

// List of pnpm package directories to fix (from error messages)
const pnpmPackages = [
  {
    dir: 'zustand@5.0.14_@types+react_122f82f11594e08784ed41ac749a334c',
    pkg: 'zustand'
  },
  {
    dir: '@trpc+client@11.18.0_@trpc+_ad223dc0c60686eee1e26c0a79ea3c4f',
    pkg: '@trpc/client'
  },
  {
    dir: '@trpc+react-query@11.18.0_@_379054c4e405696ae684c73254aebec2',
    pkg: '@trpc/react-query'
  },
  {
    dir: 'merge-options@3.0.4',
    pkg: 'merge-options'
  },
  {
    dir: '@ai-sdk+react@2.0.218_react@19.2.7_zod@4.4.3',
    pkg: '@ai-sdk/react'
  },
  {
    dir: '@rork-ai+toolkit-sdk@0.2.54_9088bd06b080baead0417bc2184d5134',
    pkg: '@rork-ai/toolkit-sdk'
  }
];

function fixPackage(item) {
  const { dir, pkg } = item;
  const pkgJsonPath = path.join(baseDir, dir, 'node_modules', pkg, 'package.json');
  
  if (!fs.existsSync(pkgJsonPath)) {
    console.log(`File not found: ${pkgJsonPath}`);
    return;
  }
  
  try {
    const pkgContent = fs.readFileSync(pkgJsonPath, 'utf8');
    const pkg = JSON.parse(pkgContent);
    
    if (pkg.exports) {
      // Remove exports to allow file-based resolution
      delete pkg.exports;
      fs.writeFileSync(pkgJsonPath, JSON.stringify(pkg, null, 2) + '\n');
      console.log(`Fixed ${pkg} in ${dir}`);
    } else {
      console.log(`No exports field found for ${pkg} in ${dir}`);
    }
  } catch (error) {
    console.error(`Error fixing ${pkg}:`, error.message);
  }
}

console.log('Fixing pnpm package.json exports...\n');
pnpmPackages.forEach(fixPackage);
console.log('\nDone!');