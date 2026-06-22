const fs = require('fs');
const src = fs.readFileSync('app/ai-agent/agent-activity.tsx', 'utf8');
const lines = src.split('\n');

let depth = 0;
let inString = false;
let stringChar = '';
let inTemplate = false;
let inBlockComment = false;
let depthChanges = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  let j = 0;
  let lineOpens = 0, lineCloses = 0;
  
  while (j < line.length) {
    const ch = line[j];
    const next = line[j + 1] || '';

    if (inBlockComment) {
      if (ch === '*' && next === '/') {
        inBlockComment = false;
        j += 2;
        continue;
      }
      j++;
      continue;
    }

    if (!inString && !inTemplate && ch === '/' && next === '/') break;

    if (!inString && !inTemplate && ch === '/' && next === '*') {
      inBlockComment = true;
      j += 2;
      continue;
    }

    if (!inBlockComment && !inTemplate && !inString && (ch === '"' || ch === "'")) {
      inString = true;
      stringChar = ch;
      j++;
      continue;
    }

    if (inString && ch === '\\') { j += 2; continue; }
    if (inString && ch === stringChar) { inString = false; j++; continue; }
    if (!inString && !inBlockComment && ch === '`') { inTemplate = !inTemplate; j++; continue; }
    if (inTemplate && ch === '\\') { j += 2; continue; }
    if (inTemplate && ch === '$' && next === '{') { j += 2; continue; }

    if (!inString && !inTemplate && !inBlockComment) {
      if (ch === '{') { depth++; lineOpens++; }
      if (ch === '}') { depth--; lineCloses++; }
    }
    j++;
  }
  
  if (lineOpens !== 0 || lineCloses !== 0) {
    depthChanges.push({line: i+1, depth, opens: lineOpens, closes: lineCloses, text: line.trim().substring(0, 60)});
  }
  
  // Check if depth is 0, meaning function body is closed
  if (depth === 0 && i < 600) {
    console.log('Depth hits 0 at L' + (i+1));
  }
}

console.log('Final depth:', depth);
console.log('Last 20 brace changes:');
depthChanges.slice(-20).forEach(d => {
  console.log('  L' + d.line + ' depth=' + d.depth + ' [+' + d.opens + '/-' + d.closes + '] ' + d.text);
});
