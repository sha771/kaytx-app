const fs = require('fs');
const content = fs.readFileSync('app/ai-agent/ai-layers.tsx', 'utf-8');
const lines = content.split('\n');
let depth = 0;

// Track depth changes between lines 30-410 (the component body)
for (let i = 0; i < lines.length; i++) {
  const prevDepth = depth;
  for (const ch of lines[i]) {
    if (ch === '{') depth++;
    if (ch === '}') depth--;
  }
  // Show depth changes within the component (after line 30)
  if (i >= 29 && i < 415 && depth !== prevDepth) {
    const change = depth - prevDepth;
    const dir = change > 0 ? 'UP' : 'DOWN';
    if (depth <= 3 || prevDepth <= 3 || depth >= (prevDepth + 1) && depth <= 2) {
      console.log(`Line ${i+1}: depth ${prevDepth}->${depth} (${dir}): ${lines[i].substring(0, 100)}`);
    }
  }
}
console.log(`\nFinal depth: ${depth}`);
