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

// Icon name to variable mapping
const iconMap = {
  'Heart': 'Heart', 'ShieldCheck': 'ShieldCheck', 'FileText': 'FileText',
  'Zap': 'Zap', 'Calendar': 'Calendar', 'Star': 'Star', 'TrendingUp': 'TrendingUp',
  'MessageSquare': 'MessageSquare', 'ClipboardList': 'ClipboardList', 'Compass': 'Compass',
  'LogOut': 'LogOut', 'ShieldAlert': 'ShieldAlert', 'Target': 'Target',
  'ArrowRight': 'ArrowRight', 'GitMerge': 'GitMerge', 'Code': 'Code',
  'RefreshCw': 'RefreshCw', 'DollarSign': 'DollarSign', 'FolderOpen': 'FolderOpen',
  'Video': 'Video', 'Wrench': 'Wrench', 'Activity': 'Activity', 'Search': 'Search',
  'GraduationCap': 'GraduationCap', 'BarChart3': 'BarChart3', 'Monitor': 'Monitor',
  'Users': 'Users', 'ChartBarBig': 'ChartBarBig', 'AlertTriangle': 'AlertTriangle',
  'CircleCheckBig': 'CircleCheckBig', 'Clock': 'Clock', 'Lock': 'Lock',
  'Stethoscope': 'Stethoscope', 'Settings': 'Settings', 'HeartPulse': 'HeartPulse',
  'GitBranch': 'GitBranch', 'CreditCard': 'CreditCard', 'HeartHandshake': 'HeartHandshake'
};

mainAgents.forEach(id => {
  const filePath = path.join(BASE, id + '.tsx');
  if (!fs.existsSync(filePath)) { console.log('SKIP:', id); return; }
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix SUB_AGENTS: replace "icon": "IconName" with "icon": IconName
  content = content.replace(/"icon":\s*"(\w+)"/g, (match, iconName) => {
    if (iconMap[iconName]) return `"icon": ${iconName}`;
    return match;
  });

  // Fix QUICK_ACTIONS: same
  // Already handled by the regex above

  // Fix activities: replace "icon": "IconName" with "icon": IconName  
  // Already handled

  // Fix stats: replace "icon": "IconName" with "icon": IconName
  // Already handled

  fs.writeFileSync(filePath, content);
  console.log('Fixed:', id);
});

console.log('Done fixing icon references');
