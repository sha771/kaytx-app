const fs = require('fs');

const report = JSON.parse(fs.readFileSync('audit-report.json', 'utf-8'));

console.log('🧪 Test Coverage Analysis\n');
console.log(`Current Coverage: ${report.scanResult.testCoverage.coveragePercentage.toFixed(1)}%`);
console.log(`Total Source Files: ${report.scanResult.testCoverage.totalFiles}`);
console.log(`Tested Files: ${report.scanResult.testCoverage.testedFiles}`);
console.log(`Untested Files: ${report.scanResult.testCoverage.untestedFiles.length}\n`);

console.log('🔍 Top 20 Critical Files Needing Tests:\n');

// Filter to backend TypeScript files and prioritize by importance
const backendFiles = report.scanResult.testCoverage.untestedFiles.filter(file => 
  file.includes('backend/') && 
  (file.endsWith('.ts') || file.endsWith('.tsx')) &&
  !file.includes('.test.') &&
  !file.includes('.spec.') &&
  !file.includes('__tests__')
);

// Sort by importance (services, routes, lib files first)
const priorityFiles = backendFiles.sort((a, b) => {
  const aPriority = getPriority(a);
  const bPriority = getPriority(b);
  return bPriority - aPriority;
});

function getPriority(file) {
  let priority = 0;
  if (file.includes('/services/')) priority += 10;
  if (file.includes('/routes/')) priority += 9;
  if (file.includes('/lib/')) priority += 8;
  if (file.includes('/middleware/')) priority += 7;
  if (file.includes('audit')) priority += 5;
  if (file.includes('security')) priority += 5;
  if (file.includes('payment')) priority += 4;
  if (file.includes('ai-')) priority += 4;
  return priority;
}

console.log('Priority | File Path');
console.log('---------|----------');
priorityFiles.slice(0, 20).forEach((file, index) => {
  const priority = getPriority(file);
  console.log(`${priority.toString().padStart(7)} | ${file}`);
});

console.log('\n📊 Test Coverage by Directory:\n');

const coverageByDir = {};
report.scanResult.testCoverage.untestedFiles.forEach(file => {
  const dir = file.split('/')[0] + '/' + file.split('/')[1];
  coverageByDir[dir] = (coverageByDir[dir] || 0) + 1;
});

Object.entries(coverageByDir)
  .sort(([,a], [,b]) => b - a)
  .slice(0, 10)
  .forEach(([dir, count]) => {
    console.log(`${dir}: ${count} untested files`);
  });

console.log('\n🎯 Recommended Test Implementation Order:');
console.log('1. High Priority (Services & Routes): Core business logic');
console.log('2. Medium Priority (Lib & Middleware): Infrastructure components');
console.log('3. Low Priority (Utilities & Helpers): Supporting functions');
