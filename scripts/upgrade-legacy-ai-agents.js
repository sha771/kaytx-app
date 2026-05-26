const fs = require('fs');
const path = require('path');

const AI_AGENT_DIR = path.join(__dirname, '..', 'app', 'ai-agent');

const TARGETS = [
  'ai-personal-assistant-ai.tsx',
  'analysis-performance-ai.tsx',
  'customer-experience-ai.tsx',
  'data-intelligence-ai.tsx',
  'engineering-development-ai.tsx',
  'executive-leadership-ai.tsx',
  'human-resources-ai.tsx',
  'it-technology-ai.tsx',
  'legal-compliance-ai.tsx',
  'marketing-growth-ai.tsx',
  'operations-management-ai.tsx',
  'product-rnd-ai.tsx',
  'sales-revenue-ai.tsx',
  'social-media-management-ai.tsx',
];

function getDepartmentFromName(name) {
  const map = {
    'ai-personal-assistant': 'admin',
    'analysis-performance': 'performance',
    'customer-experience': 'customer',
    'data-intelligence': 'data',
    'engineering-development': 'tech',
    'executive-leadership': 'executive',
    'human-resources': 'hr',
    'it-technology': 'tech',
    'legal-compliance': 'legal',
    'marketing-growth': 'marketing',
    'operations-management': 'operations',
    'product-rnd': 'product',
    'sales-revenue': 'sales',
    'social-media-management': 'marketing',
  };
  return map[name] || 'operations';
}

function generateWrapperPage(agentFileName) {
  const base = path.basename(agentFileName, '.tsx').replace(/-ai$/, '');
  const id = base;
  const pretty = base.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const dept = getDepartmentFromName(base);
  const colors = { admin: '#6366F1', performance: '#8B5CF6', customer: '#EC4899', data: '#06B6D4', tech: '#0EA5E9', executive: '#1E40AF', hr: '#F97316', legal: '#7C2D12', marketing: '#BE123C', operations: '#F59E0B', product: '#9333EA', sales: '#4338CA' };
  const color = colors[dept] || '#007AFF';

  return `import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function ${pretty.replace(/\s+/g, '')}AIPage() {
  const agent = {
    id: '${id}',
    name: 'AI ${pretty}',
    title: '${pretty} AI',
    description: 'The ${pretty} AI provides specialized services and automation within its department with full support for chat, analytics, performance tracking, capabilities, history, counseling, live monitoring, and comprehensive settings.',
    capabilities: ["Task Automation","Data Processing","Workflow Coordination","Performance Reporting","Quality Assurance","Compliance Monitoring","Strategic Analysis"],
    icon: Bot,
    color: '${color}',
    type: 'agent' as const,
    humanCost: '$68k/year',
    aiCost: '$1.3k/year',
    efficiency: '24x efficiency improvement',
    replacesRole: '${pretty}',
    infrastructure: { status: 'online', health: 97, uptime: '99.8%', lastActive: 'Now', processingPower: 'high' },
    roiMetrics: { savingsPerMonth: '$5,400', tasksAutomatedDaily: 142, responseTime: '<1.1s', accuracyRate: '97.4%' },
    hierarchy: { department: '${dept.charAt(0).toUpperCase() + dept.slice(1)}' },
  };
  return <AgentPageWrapper agent={agent} />;
}
`;
}

console.log('🚀 Upgrading remaining legacy AI agent pages to comprehensive system...\n');

let updated = 0;
TARGETS.forEach(target => {
  // Search recursively
  function findFile(dir, targetName) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fp = path.join(dir, item);
      if (fs.statSync(fp).isDirectory()) {
        const found = findFile(fp, targetName);
        if (found) return found;
      } else if (item === targetName) {
        return fp;
      }
    }
    return null;
  }

  const foundPath = findFile(AI_AGENT_DIR, target);
  if (foundPath) {
    const newCode = generateWrapperPage(target);
    fs.writeFileSync(foundPath, newCode, 'utf8');
    console.log(`✅ Upgraded: ${path.relative(AI_AGENT_DIR, foundPath)}`);
    updated++;
  } else {
    console.log(`⚠️  Not found: ${target}`);
  }
});

console.log(`\n📊 Done. ${updated} pages upgraded to use full Chat + Overview + Dashboard + Analytics + Performance + Capabilities + History + Summary & Notes + Live Activity + Counseling + Settings (all subsections).`);
