const fs = require('fs');
let src = fs.readFileSync('app/ai-agent/agent-activity.tsx', 'utf8');

// Remove string contents, comments, and template literals to avoid false positives
const original = src;
// Replace strings, template literals, and comments with spaces
src = src.replace(/'[^']*'/g, m => ' '.repeat(m.length));
src = src.replace(/"[^"]*"/g, m => ' '.repeat(m.length));
src = src.replace(/`[\s\S]*?`/g, m => ' '.repeat(m.length));
src = src.replace(/\/\/.*/g, m => ' '.repeat(m.length));
src = src.replace(/\/\*[\s\S]*?\*\//g, m => ' '.repeat(m.length));

const lines = src.split('\n');
let depth = 0;
let opensAt = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (let j = 0; j < line.length; j++) {
    if (line[j] === '{') {
      depth++;
      opensAt.push({line: i + 1, col: j, depth: depth});
    }
    if (line[j] === '}') {
      depth--;
      if (opensAt.length > 0) opensAt.pop();
    }
  }
}
console.log('Final depth:', depth);
if (depth > 0) {
  const firstOpen = opensAt[opensAt.length - depth];
  console.log('First unclosed brace at L' + firstOpen.line + ':' + (firstOpen.col + 1));
  // Show context around that line
  const origLines = original.split('\n');
  for (let i = Math.max(0, firstOpen.line - 3); i < Math.min(origLines.length, firstOpen.line + 2); i++) {
    console.log('  L' + (i + 1) + ': ' + origLines[i].replace(/\r$/, ''));
  }
}
