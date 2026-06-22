const fs = require('fs');
let content = fs.readFileSync('app/ai-agent/agent-builder.tsx', 'utf8');
// After the comprehensiveFeatures block was removed, we need to add the missing function close
// Find: `    }\n\n  const renderStep`
// Replace with: `    }\n  };\n\n  const renderStep`
content = content.replace(
  '    }\n\n  const renderStep',
  '    }\n  };\n\n  const renderStep'
);
fs.writeFileSync('app/ai-agent/agent-builder.tsx', content, 'utf8');
console.log('Done');
