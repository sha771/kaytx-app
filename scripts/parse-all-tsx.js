const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.jsx') || file.endsWith('.js')) {
        results.push(file);
      }
    }
  });
  return results;
}

const root = path.resolve(process.cwd(), 'app');
const files = walk(root);
let failures = 0;
files.forEach(f => {
  const src = fs.readFileSync(f, 'utf8');
  try {
    parser.parse(src, { sourceType: 'module', plugins: ['typescript','jsx','classProperties','decorators-legacy','nullishCoalescingOperator','optionalChaining','topLevelAwait'] });
  } catch (e) {
    failures++;
    console.error('\nPARSE_ERROR in', f);
    console.error(e.message);
  }
});
if (failures === 0) {
  console.log('\nPARSE_OK: All files parsed successfully');
} else {
  console.log(`\nPARSE_DONE: ${failures} file(s) failed to parse`);
  process.exit(1);
}
