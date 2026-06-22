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
      } else if (p.endsWith('.tsx')) {
        results.push(p);
      }
    }
  } catch (e) {}
  return results;
}

const files = walk('app/ai-agent');
let fixed = 0;
const broken = [];

for (const f of files) {
  const content = fs.readFileSync(f, 'utf-8');
  
  // Pattern: file has `const agent = {` and `return <AgentPageWrapper`
  if (content.includes('const agent = {') && content.includes('return <AgentPageWrapper')) {
    const returnIdx = content.indexOf('return <AgentPageWrapper');
    const agentStart = content.indexOf('const agent = {');
    const agentSection = content.substring(agentStart, returnIdx);
    
    let openBraces = 0;
    let closeBraces = 0;
    for (const ch of agentSection) {
      if (ch === '{') openBraces++;
      if (ch === '}') closeBraces++;
    }
    
    // diff should be 0 (all braces balanced before return)
    // If diff > 0, there are unclosed braces
    const diff = openBraces - closeBraces;
    if (diff > 0) {
      console.log(`BROKEN: ${f} (missing ${diff} closing brace(s))`);
      broken.push(f);
      
      const lines = content.split('\n');
      let returnLineIdx = -1;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('return <AgentPageWrapper')) {
          returnLineIdx = i;
          break;
        }
      }
      
      if (returnLineIdx > 0) {
        // Insert `};` before the return line to close the agent object
        lines.splice(returnLineIdx, 0, '  };');
        const newContent = lines.join('\n');
        fs.writeFileSync(f, newContent);
        fixed++;
        console.log(`  FIXED: ${f}`);
      }
    }
  }
}

console.log(`\nTotal files scanned: ${files.length}`);
console.log(`Broken files found: ${broken.length}`);
console.log(`Files fixed: ${fixed}`);
