const fs = require('fs');
const src = fs.readFileSync('app/ai-agent/agent-activity.tsx', 'utf8');
const lines = src.split('\n');

// Track state
let depth = 0;
let inString = false;
let stringChar = '';
let inTemplate = false;
let inBlockComment = false;

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

    if (!inString && !inTemplate && ch === '/' && next === '/') {
      break; // rest of line is comment
    }

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

    if (inString && ch === '\\') {
      j += 2; // skip escaped char
      continue;
    }

    if (inString && ch === stringChar) {
      inString = false;
      j++;
      continue;
    }

    if (!inString && !inBlockComment && ch === '`') {
      inTemplate = !inTemplate;
      j++;
      continue;
    }

    if (inTemplate && ch === '\\') {
      j += 2;
      continue;
    }

    if (inTemplate && ch === '$' && next === '{') {
      j += 2;
      continue;
    }

    if (!inString && !inTemplate && !inBlockComment) {
      if (ch === '{') {
        depth++;
      }
      if (ch === '}') {
        depth--;
      }
    }

    j++;
  }
}

console.log('Final depth after parsing:', depth);
