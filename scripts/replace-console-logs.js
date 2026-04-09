#!/usr/bin/env node

/**
 * Script to replace console.log statements with production logger
 * Usage: node scripts/replace-console-logs.js
 */

const fs = require('fs');
const path = require('path');

const servicesDir = path.join(__dirname, '../backend/services');
const libDir = path.join(__dirname, '../backend/lib');

const loggerImport = `import { createLogger } from '../lib/production-logger';

const logger = createLogger(__filename.split('/').pop()?.replace('.ts', '') || 'Service');`;

const replacementPattern = [
  [/console\.log\(`\[(\w+)\] (.+)`\)/g, 'logger.info(`$2`)'],
  [/console\.log\('\[(\w+)\] (.+)'\)/g, "logger.info(`$2`)"],
  [/console\.log\((.+)\)/g, 'logger.info($1)'],
  [/console\.debug\(`\[(\w+)\] (.+)`\)/g, 'logger.debug(`$2`)'],
  [/console\.debug\((.+)\)/g, 'logger.debug($1)'],
  [/console\.info\(`\[(\w+)\] (.+)`\)/g, 'logger.info(`$2`)'],
  [/console\.info\((.+)\)/g, 'logger.info($1)'],
  [/console\.warn\(`\[(\w+)\] (.+)`\)/g, 'logger.warn(`$2`)'],
  [/console\.warn\((.+)\)/g, 'logger.warn($1)'],
  [/console\.error\(`\[(\w+)\] (.+)`,? ?(.+)\)/g, 'logger.error(`$2`, $3)'],
  [/console\.error\((.+)\)/g, 'logger.error($1)'],
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;

  // Check if file already has logger import
  if (content.includes("createLogger")) {
    console.log(`  ⏭️  Skipping (already has logger): ${filePath}`);
    return;
  }

  // Check if file has console.log statements
  if (!content.includes('console.log') && 
      !content.includes('console.error') && 
      !content.includes('console.warn') &&
      !content.includes('console.debug') &&
      !content.includes('console.info')) {
    console.log(`  ⏭️  Skipping (no console statements): ${filePath}`);
    return;
  }

  // Add logger import after existing imports
  const importEndIndex = content.lastMatch;
  
  // Find the position after the last import statement
  const lines = content.split('\n');
  let importEndLine = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith('import ') || lines[i].trim() === '') {
      importEndLine = i;
    } else if (!lines[i].trim().startsWith('//') && !lines[i].trim().startsWith('/*')) {
      break;
    }
  }

  // Insert logger import after imports
  lines.splice(importEndLine + 1, 0, '\n' + loggerImport + '\n');
  content = lines.join('\n');

  // Replace console statements
  for (const [pattern, replacement] of replacementPattern) {
    content = content.replace(pattern, replacement);
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log(`  ✅ Updated: ${filePath}`);
  } else {
    console.log(`  ⏭️  No changes: ${filePath}`);
  }
}

function scanDirectory(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`Directory not found: ${dir}`);
    return;
  }

  const files = fs.readdirSync(dir);
  let count = 0;

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip test directories and node_modules
      if (file !== '__tests__' && file !== 'node_modules' && file !== '.git') {
        console.log(`\n📁 Scanning: ${file}/`);
        count += scanDirectory(filePath);
      }
    } else if (file.endsWith('.ts') && !file.endsWith('.test.ts') && !file.endsWith('.spec.ts')) {
      processFile(filePath);
      count++;
    }
  }

  return count;
}

console.log('🔄 Starting console.log replacement...\n');
console.log(`📁 Scanning: ${servicesDir}/`);

const count = scanDirectory(servicesDir);

console.log(`\n✅ Processed ${count} files`);
console.log('\nNote: Some files may need manual review for complex console statements');
