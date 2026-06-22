const fs = require('fs');
const src = fs.readFileSync('app/ai-agent/agent-activity.tsx', 'utf8');
const lines = src.split('\n');

let depth = 0;
let inString = false;
let stringChar = '';
let inTemplate = false;
let inBlockComment = false;
let issues = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  let j = 0;
  
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
      if (ch === '{') depth++;
      if (ch === '}') depth--;
    }
    j++;
  }
  
  // Check if we're in a string or template at the end of a line
  if (inString && line.trim().length > 0) {
    issues.push({line: i+1, type: 'inString', char: stringChar});
  }
  if (inTemplate) {
    issues.push({line: i+1, type: 'inTemplate'});
  }
}

console.log('Final depth:', depth);
if (issues.length > 0) {
  console.log('Issues found:');
  issues.slice(-5).forEach(iss => console.log('  L' + iss.line + ': ' + iss.type + (iss.char ? ' (' + iss.char + ')' : '')));
} else {
  console.log('No state issues, depth should be correct');
}
