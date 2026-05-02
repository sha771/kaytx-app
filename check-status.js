const { exec } = require('child_process');
const fs = require('fs');

const cwd = 'c:/Users/shaida/Desktop/kaytx-full-app';

console.log('Starting platform connectivity check...\n');

// Check 1: TypeScript
exec('npm run typecheck', { cwd, maxBuffer: 1024*1024, timeout: 120000 }, (err, stdout, stderr) => {
  const result = {
    timestamp: new Date().toISOString(),
    typecheck: err ? { status: 'FAIL', error: stderr } : { status: 'PASS', output: stdout }
  };
  
  fs.writeFileSync('status-check.json', JSON.stringify(result, null, 2));
  console.log('Typecheck:', err ? 'FAILED' : 'PASSED');
  console.log('Results saved to status-check.json');
});
