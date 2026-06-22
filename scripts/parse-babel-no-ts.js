const fs = require('fs');
const parser = require('@babel/parser');
const path = process.argv[2];
if (!path) {
  console.error('Usage: node parse-babel-no-ts.js <file>');
  process.exit(2);
}
const src = fs.readFileSync(path, 'utf8');
try {
  const ast = parser.parse(src, {
    sourceType: 'module',
    plugins: [
      'jsx',
      'classProperties',
      'decorators-legacy',
      'nullishCoalescingOperator',
      'optionalChaining',
      'topLevelAwait',
    ],
  });
  console.log('PARSE_OK');
} catch (e) {
  console.error(e && e.toString ? e.toString() : e);
  process.exit(1);
}
