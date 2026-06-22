const fs = require('fs');
const src = fs.readFileSync('app/ai-agent/agent-activity.tsx', 'utf8');
const lines = src.split('\n');

// Track brace depth, ignoring braces inside strings/templates/comments
let depth = 0;
let depthByLine = [];
let inBlockComment = false;

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  let inString = false;
  let stringChar = '';
  let inTemplate = false;
  let inRegex = false;
  
  let lineOpen = 0, lineClose = 0;
  
  for (let j = 0; j < line.length; j++) {
    const ch = line[j];
    const next = line[j + 1] || '';
    
    if (inBlockComment) {
      if (ch === '*' && next === '/') {
        inBlockComment = false;
        j++; // skip /
      }
      continue;
    }
    
    if (!inString && !inTemplate && !inRegex) {
      if (ch === '/' && next === '/') break; // rest of line is comment
      if (ch === '/' && next === '*') { inBlockComment = true; j++; continue; }
    }
    
    if (!inBlockComment && !inRegex) {
      if (ch === '"' && !inString) { inString = true; stringChar = '"'; continue; }
      if (ch === "'" && !inString) { inString = true; stringChar = "'"; continue; }
      if (ch === '`' && !inString) { inTemplate = !inTemplate; continue; }
      if (inString && ch === stringChar) { inString = false; continue; }
      if (inString && ch === '\\') { j++; continue; } // skip escaped char
      if (inTemplate && ch === '\\') { j++; continue; } // skip escaped char in template
      if (inTemplate && ch === '$' && next === '{') { j++; continue; } // skip template interpolation
    }
    
    if (!inString && !inTemplate && !inBlockComment && !inRegex) {
      if (ch === '{') { depth++; lineOpen++; }
      if (ch === '}') { depth--; lineClose++; }
    }
  }
  
  if (lineOpen !== 0 || lineClose !== 0) {
    depthByLine.push({line: i + 1, depth, opens: lineOpen, closes: lineClose});
  }
}

console.log('Final depth:', depth);
// Show the last 30 brace changes
const last30 = depthByLine.slice(-30);
last30.forEach(d => {
  console.log('L' + d.line + ' depth=' + d.depth + ' [+' + d.opens + '/-' + d.closes + ']');
});

// Find where depth goes back to 0 (function close)
const zeroDepthLines = depthByLine.filter(d => d.depth === 0);
console.log('\nLines where depth hits 0:', zeroDepthLines.map(d => 'L' + d.line).join(', '));
