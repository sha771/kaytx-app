const fs = require('fs');
const path = require('path');
const glob = require('glob');

const files = glob.sync('app/ai-agent/**/*.tsx');
let fixed = 0, skipped = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('comprehensiveFeatures:')) {
    skipped++;
    continue;
  }

  const lines = content.split('\n');
  const newLines = [];
  let inBlock = false;
  let blockStartLine = -1;
  let braceDepth = 0;
  let sawCommunicationChannels = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (!inBlock && line.includes('comprehensiveFeatures:')) {
      inBlock = true;
      blockStartLine = i;
      sawCommunicationChannels = false;
      braceDepth = 0;
      // Count the opening brace from comprehensiveFeatures: {
      const opens = (line.match(/\{/g) || []).length;
      const closes = (line.match(/\}/g) || []).length;
      braceDepth += opens - closes;
      continue;
    }

    if (inBlock) {
      const opens = (line.match(/\{/g) || []).length;
      const closes = (line.match(/\}/g) || []).length;
      braceDepth += opens - closes;

      // Track whether we saw the communicationChannels part
      if (line.includes('"communicationChannels"')) sawCommunicationChannels = true;

      // Check if the block is done: brace depth returns to 0 or below
      if (braceDepth <= 0 && sawCommunicationChannels) {
        // The }}; or }; at the end might close the comprehensiveFeatures block
        // AND a parent function. Check if we need to add a function close.
        // Look at what was before the block to determine if it was inside a function body
        inBlock = false;
        continue;
      }
      continue;
    }

    newLines.push(line);
  }

  if (blockStartLine >= 0) {
    // Check if we need to close a dangling function
    // Look back from blockStartLine to find if there's an unclosed function
    let depth = 0;
    let needsClose = false;
    for (let i = 0; i < blockStartLine; i++) {
      const line = newLines[i] || lines[i];
      const opens = (line.match(/\{/g) || []).length;
      const closes = (line.match(/\}/g) || []).length;
      depth += opens - closes;
    }
    // If depth is positive after removing the block, we need to add a close
    if (depth > 0) {
      // Find the right indentation for the close
      // Use the indentation of the line before the block
      const prevLine = blockStartLine > 0 ? lines[blockStartLine - 1] : '';
      const indent = prevLine.match(/^\s*/)[0] || '  ';
      // Add closing brace for the dangling function
      // But only if the last line before block was just }
      const trimmedPrev = prevLine.trim();
      if (trimmedPrev === '}' || trimmedPrev.endsWith('}')) {
        // The previous line already closes something, add another close
        newLines.splice(blockStartLine, 0, indent + '};');
      } else {
        newLines.splice(blockStartLine, 0, indent + '};');
      }
    }

    const result = newLines.join('\n');
    fs.writeFileSync(file, result, 'utf8');
    fixed++;
    console.log(`Fixed: ${file}`);
  } else if (content.includes('comprehensiveFeatures:')) {
    console.log(`WARNING: Could not parse block in ${file}`);
  }
}

console.log(`\nDone. Fixed: ${fixed}, Skipped (no comprehensiveFeatures): ${skipped}`);
