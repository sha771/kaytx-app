const fs = require('fs');

const report = JSON.parse(fs.readFileSync('audit-report.json', 'utf-8'));

console.log('🔒 Top 10 Security Issues:\n');
report.scanResult.securityIssues.slice(0, 10).forEach((issue, i) => {
  console.log(`${i + 1}. ${issue.type} in ${issue.filePath} - ${issue.severity}`);
  console.log(`   ${issue.description}`);
  console.log(`   Recommendation: ${issue.recommendation}`);
  console.log();
});

console.log('⚠️ Top 5 Incomplete Implementations:\n');
report.scanResult.incompleteImplementations.slice(0, 5).forEach((impl, i) => {
  console.log(`${i + 1}. ${impl.filePath} - ${impl.completionPercentage}% complete (${impl.priority})`);
  impl.issues.forEach(issue => {
    console.log(`   - ${issue}`);
  });
  console.log();
});

console.log('📊 Summary:');
console.log(`- Total Security Issues: ${report.scanResult.securityIssues.length}`);
console.log(`- Total Incomplete Implementations: ${report.scanResult.incompleteImplementations.length}`);
console.log(`- Test Coverage: ${report.scanResult.testCoverage.coveragePercentage.toFixed(1)}%`);
console.log(`- Files to Remove: ${report.scanResult.unnecessaryFiles.length}`);
