const fs=require('fs'),p=require('path');
const d=p.join(__dirname,'..','app','ai-agent','marketing','sub-agents');

// Map of icon name strings to actual component references
const iconMap = {
  'TrendingUp': 'TrendingUp',
  'DollarSign': 'DollarSign',
  'ChartBarBig': 'ChartBarBig',
  'Layers': 'Layers',
  'Calendar': 'Calendar',
  'GitMerge': 'GitMerge',
  'Eye': 'Eye',
  'Shield': 'Shield',
  'ImageIcon': 'ImageIcon',
  'FlaskConical': 'FlaskConical',
  'Filter': 'Filter',
  'GitBranch': 'GitBranch',
  'CheckCircle': 'CheckCircle',
  'RefreshCw': 'RefreshCw',
  'Globe': 'Globe',
  'Gauge': 'Gauge',
  'UserPlus': 'UserPlus',
  'Timer': 'Timer',
  'Activity': 'Activity',
  'Target': 'Target',
  'Zap': 'Zap',
  'Megaphone': 'Megaphone',
};

const files = fs.readdirSync(d).filter(f => f.endsWith('.tsx') && f !== 'index.tsx');

files.forEach(f => {
  const fp = p.join(d, f);
  let content = fs.readFileSync(fp, 'utf8');
  
  // Fix icon string values in activities array: icon:"IconName" -> icon:IconName
  content = content.replace(/icon:"([A-Z][a-zA-Z]+)"/g, (match, iconName) => {
    if (iconMap[iconName]) {
      return `icon:${iconName}`;
    }
    return match;
  });
  
  // Fix label string values that shouldn't change: label:"text" stays as is (already correct)
  
  fs.writeFileSync(fp, content, 'utf8');
  console.log('Fixed: ' + f);
});

console.log('All sub-agent icon references fixed!');
