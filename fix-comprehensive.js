const fs = require('fs');
const path = require('path');

function findFiles(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findFiles(fullPath));
    } else if (entry.name.endsWith('.tsx')) {
      files.push(fullPath);
    }
  }
  return files;
}

const exclude = new Set(['agent-builder.tsx', 'agent-activity.tsx']);
const files = findFiles('app/ai-agent').filter(f => !exclude.has(path.basename(f)));

let fixed = 0;
let errors = 0;

for (const filePath of files) {
  let content = fs.readFileSync(filePath, 'utf8');
  const startIdx = content.indexOf('comprehensiveFeatures:');
  if (startIdx === -1) continue;

  // Find the line boundary containing comprehensiveFeatures
  const beforeStart = content.lastIndexOf('\n', startIdx);
  const blockStartPos = beforeStart === -1 ? 0 : beforeStart + 1;

  // Count initial { on the start line
  let lineEnd = content.indexOf('\n', blockStartPos);
  if (lineEnd === -1) lineEnd = content.length;
  const startLine = content.slice(blockStartPos, lineEnd);
  let depth = 0;
  let inString = false;
  for (const ch of startLine) {
    if (ch === '"') inString = !inString;
    else if (ch === '{' && !inString) depth++;
  }

  if (depth === 0) {
    console.error('WARN: No opening brace found for comprehensiveFeatures in', filePath);
    errors++;
    continue;
  }

  // Scan forward for matching close
  let pos = lineEnd;
  let blockEndPos = -1;
  while (pos < content.length && depth > 0) {
    const ch = content[pos];
    if (ch === '\n') {
      inString = false;
    } else if (ch === '"') {
      inString = !inString;
    } else if (!inString) {
      if (ch === '{') depth++;
      else if (ch === '}') {
        depth--;
        if (depth === 0) {
          blockEndPos = pos;
        }
      }
    }
    pos++;
  }

  if (blockEndPos === -1) {
    console.error('WARN: Could not find matching close for comprehensiveFeatures in', filePath);
    errors++;
    continue;
  }

  // Include any trailing ; or } after the close brace
  while (blockEndPos + 1 < content.length && (content[blockEndPos + 1] === ';' || content[blockEndPos + 1] === '}')) {
    blockEndPos++;
  }
  // Include the newline after the closing
  if (blockEndPos + 1 < content.length && content[blockEndPos + 1] === '\n') {
    blockEndPos++;
  }

  const before = content.slice(0, blockStartPos);
  const after = content.slice(blockEndPos + 1);

  content = before + after;

  fs.writeFileSync(filePath, content, 'utf8');
  fixed++;
}

console.log('Done. Fixed:', fixed, 'Errors:', errors);
