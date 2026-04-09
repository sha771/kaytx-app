#!/usr/bin/env node
/**
 * ESLint Auto-Fix Script
 * Fixes common ESLint issues in batches
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const APP_DIR = path.join(__dirname, 'app');
const BACKEND_DIR = path.join(__dirname, 'backend');

// Common patterns to fix
const FIXES = {
  // Fix 1: Remove unused catch variables
  unusedCatch: {
    pattern: /catch\s*\(\s*(\w+)\s*\)/g,
    replacement: 'catch',
    description: 'Remove unused catch variables'
  },
  // Fix 2: Convert == to === for null checks
  looseEquality: {
    pattern: /(?<![=!])==(?!=)/g,
    replacement: '===',
    description: 'Convert loose equality to strict equality'
  },
  // Fix 3: Convert != to !== for null checks  
  looseInequality: {
    pattern: /(?<![=!])!=(?!=)/g,
    replacement: '!==',
    description: 'Convert loose inequality to strict inequality'
  }
};

// Files to process
const files = [
  'app/ai-agent/training-dashboard.tsx',
  'app/ai-agent/agent-performance.tsx',
  'app/ai-agent/workflow-builder.tsx',
  'app/ai-agent/bulk-counseling.tsx',
  'app/ai-agent/marketing-growth-ai.tsx',
  'app/ai-agent/sales-revenue-ai.tsx',
  'app/ai-agent/kaytxx-workforce.tsx',
  'app/ai-agent/notifications.tsx',
  'app/ai-agent/import-export.tsx',
  'app/ai-receptionist/phone-numbers.tsx'
];

console.log('ESLint Auto-Fix Script');
console.log('======================\n');

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${file}`);
    return;
  }
  
  console.log(`Processing: ${file}`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Apply fixes
  Object.entries(FIXES).forEach(([name, fix]) => {
    const newContent = content.replace(fix.pattern, fix.replacement);
    if (newContent !== content) {
      content = newContent;
      modified = true;
      console.log(`  ✅ ${fix.description}`);
    }
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  💾 Saved changes\n`);
  } else {
    console.log(`  ℹ️  No changes needed\n`);
  }
});

console.log('Done! Run ESLint to verify fixes.');
