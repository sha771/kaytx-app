const fs = require('fs');
const path = require('path');

// List of root agent pages to update
const rootAgentPages = [
  'app/ai-agent/ai-appointment-scheduler.tsx',
  'app/ai-agent/ai-agents-employees.tsx',
  'app/ai-agent/ai-agent.tsx',
  'app/ai-agent/agents-analytics.tsx',
  'app/ai-agent/agent-work.tsx',
  'app/ai-agent/agent-summary.tsx',
  'app/ai-agent/agent-status.tsx',
  'app/ai-agent/agent-performance.tsx',
  'app/ai-agent/agent-insights.tsx',
  'app/ai-agent/agent-history.tsx',
  'app/ai-agent/agent-data-upload.tsx',
  'app/ai-agent/agent-counseling.tsx',
  'app/ai-agent/ai-follow-up-scheduler.tsx',
  'app/ai-agent/ai-faq-responder.tsx',
  'app/ai-agent/ai-escalation-router.tsx',
  'app/ai-agent/ai-engagement-scoring-agent.tsx',
  'app/ai-agent/ai-data-analytics.tsx',
  'app/ai-agent/ai-data-analyst.tsx',
  'app/ai-agent/ai-customer-support.tsx',
  'app/ai-agent/ai-crm-assistant.tsx',
  'app/ai-agent/ai-complaint-categorizer.tsx',
  'app/ai-agent/ai-competitive-intel.tsx',
  'app/ai-agent/ai-competitive-analyst.tsx',
  'app/ai-agent/ai-command-visualization.tsx',
  'app/ai-agent/ai-cmo.tsx',
  'app/ai-agent/ai-campaign-optimizer.tsx',
  'app/ai-agent/ai-call-router.tsx',
  'app/ai-agent/ai-at-risk-identifier.tsx',
  'app/ai-agent/accounting-finance-ai.tsx',
  'app/ai-agent/activity-log.tsx',
  'app/ai-agent/admin/cao-admin.tsx',
  'app/ai-agent/admin/audit-logs.tsx',
  'app/ai-agent/admin/system-settings.tsx',
];

// Generic agent data template
function generateAgentData(agentId) {
  const iconMap = {
    'ai-appointment-scheduler': 'Calendar',
    'ai-agents-employees': 'Users',
    'ai-agent': 'Bot',
    'agents-analytics': 'BarChart',
    'agent-work': 'Briefcase',
    'agent-summary': 'FileText',
    'agent-status': 'Activity',
    'agent-performance': 'TrendingUp',
    'agent-insights': 'Lightbulb',
    'agent-history': 'Clock',
    'agent-data-upload': 'Upload',
    'agent-counseling': 'MessageSquare',
    'ai-follow-up-scheduler': 'CalendarClock',
    'ai-faq-responder': 'HelpCircle',
    'ai-escalation-router': 'ArrowUpRight',
    'ai-engagement-scoring-agent': 'Star',
    'ai-data-analytics': 'BarChart',
    'ai-data-analyst': 'Database',
    'ai-customer-support': 'Headphones',
    'ai-crm-assistant': 'Users',
    'ai-complaint-categorizer': 'AlertTriangle',
    'ai-competitive-intel': 'Target',
    'ai-competitive-analyst': 'Search',
    'ai-command-visualization': 'Eye',
    'ai-cmo': 'Crown',
    'ai-campaign-optimizer': 'Megaphone',
    'ai-call-router': 'Phone',
    'ai-at-risk-identifier': 'AlertCircle',
    'accounting-finance-ai': 'DollarSign',
    'activity-log': 'Scroll',
    'cao-admin': 'Shield',
    'audit-logs': 'FileCheck',
    'system-settings': 'Settings',
  };

  const icon = iconMap[agentId] || 'Bot';

  const name = agentId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  return {
    name: `AI ${name}`,
    title: 'AI Agent',
    description: `Automated ${name} agent with advanced AI capabilities for task automation, data processing, and workflow coordination.`,
    color: '#6366F1',
    icon,
  };
}

function generateAgentPage(agentId, agentData) {
  const capabilities = [
    'Task Automation',
    'Data Processing',
    'Workflow Coordination',
    'Performance Reporting',
    'Quality Assurance',
    'Compliance Monitoring',
  ];

  return `import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { ${agentData.icon} } from 'lucide-react-native';

export default function ${agentId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')}Page() {
  const agent = {
    id: '${agentId}',
    name: '${agentData.name}',
    title: '${agentData.title}',
    description: '${agentData.description}',
    capabilities: ${JSON.stringify(capabilities)},
    icon: ${agentData.icon},
    color: '${agentData.color}',
    type: 'agent' as const,
    humanCost: '$60k/year',
    aiCost: '$1.2k/year',
    efficiency: '18x efficiency improvement',
    replacesRole: '${agentData.name.replace('AI ', '')}',
    infrastructure: {
      status: 'online',
      health: 96,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3,800',
      tasksAutomatedDaily: 85,
      responseTime: '<1.5s',
      accuracyRate: '95%',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
`;
}

function updateRootAgentPage(filePath) {
  const agentId = path.basename(filePath, '.tsx');
  
  // Skip index.tsx files
  if (agentId === 'index') {
    return false;
  }

  // Skip files that are already using AgentPageWrapper
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('AgentPageWrapper')) {
      console.log(`⏭️  Skipped (already updated): ${filePath}`);
      return false;
    }
  } catch (error) {
    // File might not exist or be readable
  }

  const agentData = generateAgentData(agentId);

  try {
    const newContent = generateAgentPage(agentId, agentData);
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`✅ Updated: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
    return false;
  }
}

// Main execution
console.log('🚀 Starting root agent page updates...\n');

let successCount = 0;
let failCount = 0;
let skipCount = 0;

rootAgentPages.forEach(filePath => {
  const fullPath = path.join(__dirname, '..', filePath);
  
  if (fs.existsSync(fullPath)) {
    const success = updateRootAgentPage(fullPath);
    if (success) successCount++;
    else skipCount++;
  } else {
    console.log(`⚠️  File not found: ${fullPath}`);
    skipCount++;
  }
});

console.log(`\n📊 Summary:`);
console.log(`✅ Successfully updated: ${successCount}`);
console.log(`❌ Failed: ${failCount}`);
console.log(`⏭️  Skipped (already updated or not found): ${skipCount}`);
console.log(`📋 Total processed: ${successCount + failCount + skipCount}`);
