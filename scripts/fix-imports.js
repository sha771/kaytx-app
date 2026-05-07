const fs = require('fs');
const path = require('path');
const dir = 'c:/Users/shaida/Desktop/kaytx-full-app/app/ai-agent';

const allFixes = [
  { file: 'marketing/ai-content-marketing-agent.tsx', addImports: ['PenLine', 'FileEdit', 'Share2'] },
  { file: 'marketing/ai-seo-specialist-agent.tsx', addImports: ['Search', 'FileCode', 'Link'] },
  { file: 'marketing/ai-social-media-manager-agent.tsx', addImports: ['Calendar', 'MessageCircle', 'TrendingUp'] },
  { file: 'marketing/ai-email-marketing-agent.tsx', addImports: ['Users', 'Layout', 'ShieldCheck'] },
  { file: 'marketing/ai-ad-campaign-manager-agent.tsx', addImports: ['DollarSign', 'Image', 'Users'] },
  { file: 'marketing/ai-marketing-analytics-agent.tsx', addImports: ['GitMerge', 'LayoutDashboard', 'Lightbulb'] },
  { file: 'operations/vp-operations.tsx', addImports: ['ClipboardCheck', 'Clock', 'Gauge'] },
];

for (const fix of allFixes) {
  const filePath = path.join(dir, fix.file);
  if (!fs.existsSync(filePath)) { console.log('SKIP: ' + fix.file); continue; }
  let content = fs.readFileSync(filePath, 'utf8');
  
  const importLineMatch = content.match(/import \{([^}]+)\} from 'lucide-react-native';/);
  if (!importLineMatch) { console.log('NO MATCH: ' + fix.file); continue; }
  
  const currentImports = importLineMatch[1].split(',').map(s => s.trim());
  const missingImports = fix.addImports.filter(imp => !currentImports.includes(imp));
  
  if (missingImports.length === 0) { console.log('OK: ' + fix.file); continue; }
  
  const allImports = [...currentImports, ...missingImports].join(', ');
  content = content.replace(
    /import \{[^}]+\} from 'lucide-react-native';/,
    "import { " + allImports + " } from 'lucide-react-native';"
  );
  
  fs.writeFileSync(filePath, content);
  console.log('FIXED: ' + fix.file + ' (added: ' + missingImports.join(', ') + ')');
}

console.log('\nDone!');
