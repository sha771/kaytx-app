const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const p = path.join(dir, file);
      if (fs.statSync(p).isDirectory()) {
        results = results.concat(walk(p));
      } else if (p.endsWith('.tsx') || p.endsWith('.ts')) {
        results.push(p);
      }
    }
  } catch (e) {}
  return results;
}

function findUnclosedBrace(content) {
  const lines = content.split('\n');
  let depth = 0;
  
  // Track depth at end of each line
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let prevDepth = depth;
    for (const ch of line) {
      if (ch === '{') depth++;
      if (ch === '}') depth--;
    }
    
    // If depth was > 0 at start of line and increased, and the line opens a new block
    // that never gets closed, we need to find where to insert the closing
    
    // If we went from depth D to depth D (no net change) but depth is elevated,
    // check if this is a line that should have been preceded by a closing
  }
  
  return depth; // positive = unclosed braces
}

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let totalDepth = 0;
  for (const ch of content) {
    if (ch === '{') totalDepth++;
    if (ch === '}') totalDepth--;
  }
  
  if (totalDepth === 0) return false; // Already balanced
  
  // We need to add `totalDepth` closing braces
  // Strategy: track depth line by line, find the LAST point where a block
  // opens but never closes before the next sibling declaration
  
  const lines = content.split('\n');
  let insertions = []; // {lineIndex, indent, text}
  
  // For each unclosed brace, find where to insert closing
  for (let fix = 0; fix < totalDepth; fix++) {
    let depth = 0;
    let bestInsertLine = -1;
    let bestIndent = '';
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();
      const prevDepth = depth;
      
      // Calculate depth change for this line
      let lineDepthChange = 0;
      for (const ch of line) {
        if (ch === '{') lineDepthChange++;
        if (ch === '}') lineDepthChange--;
      }
      
      const newDepth = depth + lineDepthChange;
      
      // Pattern 1: Arrow function or const block that opens but the NEXT line
      // starts a new const/declaration at the SAME or LOWER depth
      if (lineDepthChange > 0 && newDepth > 0) {
        // This line opens a new block
        // Look ahead to see if this block ever closes
        let futureDepth = newDepth;
        let blockCloses = false;
        for (let j = i + 1; j < lines.length; j++) {
          for (const ch of lines[j]) {
            if (ch === '{') futureDepth++;
            if (ch === '}') futureDepth--;
          }
          if (futureDepth < newDepth) {
            blockCloses = true;
            break;
          }
        }
        
        if (!blockCloses) {
          // This block never closes! Find where to insert the closing
          // Look for the next line that starts a new declaration at the same level
          for (let j = i + 1; j < lines.length; j++) {
            const nextTrimmed = lines[j].trim();
            if (nextTrimmed === '') continue;
            
            // Calculate depth at start of line j
            let depthAtJ = 0;
            for (let k = 0; k < j; k++) {
              for (const ch of lines[k]) {
                if (ch === '{') depthAtJ++;
                if (ch === '}') depthAtJ--;
              }
            }
            
            // If depth at line j is still elevated (same as newDepth or higher than expected)
            // and the line looks like a new declaration
            if (depthAtJ >= newDepth && (
              nextTrimmed.startsWith('const ') ||
              nextTrimmed.startsWith('let ') ||
              nextTrimmed.startsWith('var ') ||
              nextTrimmed.startsWith('function ') ||
              nextTrimmed.startsWith('export ') ||
              nextTrimmed.startsWith('return ') ||
              nextTrimmed.startsWith('//') ||
              nextTrimmed.startsWith('/*')
            )) {
              bestInsertLine = j;
              // Match the indentation of the opening line
              const match = lines[i].match(/^(\s*)/);
              bestIndent = match ? match[1] : '';
              break;
            }
          }
          
          if (bestInsertLine === -1) {
            // Fallback: insert before the last line (closing of parent function)
            for (let j = lines.length - 1; j > i; j--) {
              if (lines[j].trim() === '}' || lines[j].trim() === '};') {
                bestInsertLine = j;
                const match = lines[j].match(/^(\s*)/);
                bestIndent = match ? match[1] + '  ' : '  ';
                break;
              }
            }
          }
          break;
        }
      }
      
      depth = newDepth;
    }
    
    if (bestInsertLine >= 0) {
      // Insert the closing brace
      const closingLine = bestIndent + '};';
      lines.splice(bestInsertLine, 0, closingLine);
    } else {
      console.log(`  WARNING: Could not find insertion point in ${filePath}`);
      // Last resort: insert before last non-empty line
      for (let j = lines.length - 1; j >= 0; j--) {
        if (lines[j].trim() !== '') {
          lines.splice(j + 1, 0, '};');
          break;
        }
      }
    }
  }
  
  // Verify the fix
  const fixed = lines.join('\n');
  let checkDepth = 0;
  for (const ch of fixed) {
    if (ch === '{') checkDepth++;
    if (ch === '}') checkDepth--;
  }
  
  if (checkDepth !== 0) {
    console.log(`  WARNING: ${filePath} still has depth=${checkDepth} after fix attempt`);
    return false;
  }
  
  fs.writeFileSync(filePath, fixed, 'utf-8');
  return true;
}

// Main
const files = walk('app');
let broken = 0;
let fixed = 0;
let failed = 0;
const brokenList = [];

for (const f of files) {
  const content = fs.readFileSync(f, 'utf-8');
  let depth = 0;
  for (const ch of content) {
    if (ch === '{') depth++;
    if (ch === '}') depth--;
  }
  
  if (depth !== 0) {
    broken++;
    brokenList.push(f);
    console.log(`FIXING: ${f} (depth=${depth})`);
    const success = fixFile(f);
    if (success) {
      fixed++;
      console.log(`  -> FIXED`);
    } else {
      failed++;
      console.log(`  -> FAILED`);
    }
  }
}

console.log(`\n=== SUMMARY ===`);
console.log(`Total files scanned: ${files.length}`);
console.log(`Files with unbalanced braces: ${broken}`);
console.log(`Successfully fixed: ${fixed}`);
console.log(`Failed to fix: ${failed}`);
