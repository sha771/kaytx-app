const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'app', 'ai-agent', 'trading');
const allIcons = ['Activity','ArrowRight','BarChart3','Briefcase','Calculator','Calendar','ChartBarBig','ChevronRight','CircleCheckBig','Clock','Code','DollarSign','Eye','FileText','Globe','History','Key','Landmark','Layers','Leaf','Microscope','Monitor','PieChart','Rocket','Scale','Search','Shield','ShieldAlert','ShieldCheck','Star','Target','TestTube','TrendingUp','Users','Zap','AlertTriangle','Bitcoin','ClipboardCheck','ArrowRightLeft'];
let fixes = 0;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx') && f !== 'index.tsx');
files.forEach(f => {
  let c = fs.readFileSync(path.join(dir, f), 'utf8');
  const importMatch = c.match(/import\s*\{([^}]+)\}\s*from\s*'lucide-react-native'/);
  if (!importMatch) return;
  const imported = new Set(importMatch[1].split(',').map(s => s.trim()).filter(Boolean));
  const body = c.substring(c.indexOf('return'));
  const missing = allIcons.filter(ic => body.includes(ic) && !imported.has(ic));
  if (missing.length > 0) {
    const newImported = [...imported, ...missing];
    const newImport = "import { " + newImported.join(', ') + " } from 'lucide-react-native';";
    c = c.replace(importMatch[0], newImport);
    fs.writeFileSync(path.join(dir, f), c);
    fixes += missing.length;
    console.log(f + ': added ' + missing.join(', '));
  }
});
console.log('Total fixes:', fixes);
