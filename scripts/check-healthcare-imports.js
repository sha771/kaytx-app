const fs = require('fs');
const path = require('path');
const BASE = path.join(__dirname, '..', 'app', 'ai-agent', 'healthcare');

const mainAgents = [
  'chief-medical-officer','vp-healthcare-operations','vp-patient-experience',
  'patient-services-manager','medical-billing-manager','scheduling-manager',
  'patient-coordinator','medical-coder','billing-specialist','care-coordinator',
  'health-records-specialist','telehealth-support','healthcare-compliance',
  'quality-improvement-specialist'
];

// Check each file for icon usage vs imports
mainAgents.forEach(id => {
  const filePath = path.join(BASE, id + '.tsx');
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Find the import line
  const importMatch = content.match(/import\s*\{([^}]+)\}\s*from\s*'lucide-react-native'/);
  if (!importMatch) { console.log(id, ': NO LUCIDE IMPORT'); return; }
  const imported = importMatch[1].split(',').map(s => s.trim()).filter(Boolean);
  
  // Find all icon references used as components: <IconName or icon: IconName
  const usedIcons = new Set();
  const componentUsage = content.matchAll(/<(\w+)\s+size/g);
  for (const m of componentUsage) usedIcons.add(m[1]);
  const iconPropUsage = content.matchAll(/"icon":\s*(\w+)/g);
  for (const m of iconPropUsage) usedIcons.add(m[1]);
  const iconPropUsage2 = content.matchAll(/icon:\s*(\w+)/g);
  for (const m of iconPropUsage2) usedIcons.add(m[1]);
  
  const missing = [...usedIcons].filter(ic => !imported.includes(ic) && ic !== 'stat' && ic !== 'agent' && ic !== 'action' && ic !== 'act' && ic !== 'm');
  if (missing.length > 0) {
    console.log(id, ': MISSING IMPORTS:', missing.join(', '));
    // Add missing imports
    const allImports = [...new Set([...imported, ...missing])].join(', ');
    const newContent = content.replace(
      /import\s*\{[^}]+\}\s*from\s*'lucide-react-native'/,
      `import {\n  ${allImports}\n} from 'lucide-react-native'`
    );
    fs.writeFileSync(filePath, newContent);
    console.log('  FIXED: Added', missing.join(', '));
  } else {
    console.log(id, ': OK');
  }
});

console.log('Done checking imports');
