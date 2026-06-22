const fs = require('fs');
let content = fs.readFileSync('app/ai-agent/agent-builder.tsx', 'utf8');

// Replace the newline after `    }` (close of if block) with `    }\n  };\n\n`
// to close the addCapability function
content = content.replace(
  "    }\n\n  const renderStep",
  "    }\n  };\n\n  const renderStep"
);

fs.writeFileSync('app/ai-agent/agent-builder.tsx', content, 'utf8');
console.log('Fixed. Checking parse...');

// Verify
const ts = require('typescript');
const src = fs.readFileSync('app/ai-agent/agent-builder.tsx', 'utf8');
const sf = ts.createSourceFile('t.tsx', src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
console.log('Parse errors:', sf.parseDiagnostics.length);
sf.parseDiagnostics.forEach(d => console.log('  ' + d.messageText));
