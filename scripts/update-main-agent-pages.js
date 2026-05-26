const fs = require('fs');
const path = require('path');

// List of main agent pages (not in sub-agents folders)
const mainAgentDirectories = [
  'app/ai-agent/administrative',
  'app/ai-agent/healthcare',
  'app/ai-agent/hr',
  'app/ai-agent/legal',
  'app/ai-agent/marketing',
  'app/ai-agent/sales',
  'app/ai-agent/executive',
  'app/ai-agent/operations',
  'app/ai-agent/finance',
  'app/ai-agent/customer',
  'app/ai-agent/data',
  'app/ai-agent/government',
  'app/ai-agent/insurance',
  'app/ai-agent/manufacturing',
  'app/ai-agent/product',
  'app/ai-agent/realestate',
  'app/ai-agent/research',
  'app/ai-agent/security',
  'app/ai-agent/supply-chain',
  'app/ai-agent/tech',
  'app/ai-agent/trading',
  'app/ai-agent/transportation',
];

// Generic agent data template
function generateAgentData(agentId, department) {
  const departmentColors = {
    'administrative': '#6366F1',
    'healthcare': '#EF4444',
    'hr': '#F97316',
    'legal': '#7C2D12',
    'marketing': '#BE123C',
    'sales': '#4338CA',
    'executive': '#1E40AF',
    'operations': '#F59E0B',
    'finance': '#059669',
    'customer': '#EC4899',
    'data': '#06B6D4',
    'government': '#475569',
    'insurance': '#0891B2',
    'manufacturing': '#DC2626',
    'product': '#9333EA',
    'realestate': '#15803D',
    'research': '#2563EB',
    'security': '#991B1B',
    'supply-chain': '#14B8A6',
    'tech': '#0EA5E9',
    'trading': '#10B981',
    'transportation': '#7C3AED',
  };

  const iconMap = {
    'admin-manager': 'Building2',
    'ai-document-controller': 'FileText',
    'ai-executive-assistant': 'User',
    'ai-facilities-coordinator': 'Building',
    'ai-office-manager': 'Building2',
    'ai-travel-coordinator': 'Plane',
    'cao': 'Shield',
    'chief-administrative-officer': 'Crown',
    'vp-admin-operations': 'Building2',
    'vp-facilities': 'Building',
    'ai-billing-specialist': 'DollarSign',
    'ai-care-coordinator': 'Heart',
    'ai-health-records': 'FileText',
    'ai-healthcare-compliance': 'Shield',
    'ai-medical-coder': 'Code',
    'ai-patient-coordinator': 'Users',
    'ai-quality-improvement': 'TrendingUp',
    'ai-telehealth-support': 'Video',
    'billing-specialist': 'DollarSign',
    'care-coordinator': 'Heart',
    'chief-medical-officer': 'Stethoscope',
    'cmo-healthcare': 'Stethoscope',
    'compliance-healthcare': 'Shield',
    'health-records-specialist': 'FileText',
    'healthcare-compliance': 'Shield',
    'medical-billing-manager': 'DollarSign',
    'medical-coder': 'Code',
    'patient-coordinator': 'Users',
    'patient-services-manager': 'Users',
    'quality-improvement-specialist': 'TrendingUp',
    'quality-improvement': 'TrendingUp',
    'scheduling-manager': 'Calendar',
    'ai-chro': 'Users',
    'ai-compensation-analyst': 'DollarSign',
    'ai-culture-health-monitor': 'Heart',
    'ai-curriculum-designer': 'Book',
    'ai-employee-data-manager': 'Database',
    'ai-employer-brand-strategist': 'Megaphone',
    'ai-hiring-forecast-planner': 'TrendingUp',
    'ai-hr-compliance-tracker': 'Shield',
    'ai-hr-ops-specialist': 'Settings',
    'ai-hr-process-automator': 'Zap',
    'ai-hr-strategy-advisor': 'Lightbulb',
    'ai-learning-specialist': 'GraduationCap',
    'ai-recruiter': 'UserPlus',
    'ai-skill-gap-analyzer': 'BarChart',
    'ai-talent-pipeline-analyst': 'GitBranch',
    'ai-training-effectiveness-evaluator': 'CheckCircle',
    'ai-vp-hr-ops': 'Users',
    'ai-vp-learning': 'GraduationCap',
    'ai-vp-talent': 'Star',
    'ai-workforce-planner': 'Users',
    'benefits-manager': 'Heart',
    'chro': 'Crown',
    'compensation-analyst': 'DollarSign',
    'culture-agent': 'Heart',
    'hr-compliance': 'Shield',
    'hr-ops-specialist': 'Settings',
    'learning-specialist': 'GraduationCap',
    'onboarding-agent': 'UserPlus',
    'performance-reviewer': 'BarChart',
    'recruiter': 'UserPlus',
    'recruiting-manager': 'Users',
    'ai-compliance-analyst': 'Shield',
    'ai-contract-specialist': 'FileText',
    'ai-legal-researcher': 'Search',
    'clo': 'Scale',
    'compliance-analyst': 'Shield',
    'compliance-gov': 'Building',
    'compliance-manager': 'Shield',
    'compliance-monitor': 'Eye',
    'contract-reviewer': 'FileText',
    'contract-specialist': 'FileText',
    'grants-manager': 'DollarSign',
    'grants-specialist': 'DollarSign',
    'legal-researcher': 'Search',
    'policy-analyst': 'FileText',
    'policy-manager': 'FileText',
    'public-affairs': 'Megaphone',
    'regulatory-agent': 'Shield',
    'regulatory-specialist': 'Shield',
    'risk-assessor': 'AlertTriangle',
    'ai-ad-campaign-manager': 'Megaphone',
    'ai-ad-campaign': 'Megaphone',
    'ai-attribution-modeler': 'BarChart',
    'ai-audience-targeter': 'Target',
    'ai-backlink-analyzer': 'Link',
    'ai-bid-optimizer': 'TrendingUp',
    'ai-blog-writer': 'PenTool',
    'ai-brand-manager': 'Palette',
    'ai-content-distributor': 'Share',
    'ai-content-marketing': 'FileText',
    'ai-copy-editor': 'PenTool',
    'ai-creative-tester': 'Eye',
    'ai-deliverability-monitor': 'Mail',
    'ai-email-marketing': 'Mail',
    'ai-engagement-responder': 'MessageSquare',
    'ai-growth-hacker': 'Rocket',
    'ai-insight-summarizer': 'FileText',
    'ai-keyword-researcher': 'Search',
    'ai-kpi-dashboard-builder': 'LayoutDashboard',
    'ai-list-segmenter': 'Users',
    'ai-marketing-analytics': 'BarChart',
    'ai-on-page-optimizer': 'Settings',
    'ai-post-scheduler': 'Calendar',
    'ai-seo-specialist': 'Search',
    'ai-social-media-manager': 'Share',
    'ai-template-designer': 'Layout',
    'ai-trend-monitor': 'TrendingUp',
    'audience-targeting': 'Target',
    'cmo': 'Crown',
    'content-generator': 'PenTool',
    'digital-marketer': 'Globe',
    'email-marketing': 'Mail',
    'growth-hacker': 'Rocket',
    'marketing-ads': 'Megaphone',
    'marketing-analytics': 'BarChart',
    'marketing-brand': 'Palette',
    'marketing-content': 'FileText',
    'marketing-email': 'Mail',
    'marketing-growth': 'Rocket',
    'ai-crm-assistant': 'Users',
    'ai-negotiator': 'MessageSquare',
    'ai-pricing-analyst': 'DollarSign',
    'ai-proposal-generator': 'FileText',
    'ai-sales-enablement': 'Zap',
    'ai-sales-executive': 'User',
    'ai-sales-forecasting': 'TrendingUp',
    'ai-sales-rep': 'User',
    'ai-sdr': 'Phone',
    'account-executive': 'User',
    'lead-qualifier': 'Filter',
    'pipeline-analyst': 'BarChart',
    'proposal-generator': 'FileText',
    'quota-tracker': 'Target',
    'sales-coach': 'Users',
    'sales-crm': 'Database',
    'sales-enablement': 'Zap',
    'sales-executive': 'User',
    'sales-forecast': 'TrendingUp',
    'sales-negotiator': 'MessageSquare',
    'sales-ops-manager': 'Settings',
    'sales-pricing': 'DollarSign',
    'sales-proposal': 'FileText',
    'sales-rep': 'User',
    'sales-sdr': 'Phone',
  };

  const color = departmentColors[department] || '#6366F1';
  const icon = iconMap[agentId] || 'Bot';

  const name = agentId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  return {
    name: `AI ${name}`,
    title: `${department.charAt(0).toUpperCase() + department.slice(1)} Agent`,
    description: `Automated ${name} agent specializing in ${department} operations with advanced AI capabilities for task automation, data processing, and workflow coordination.`,
    color,
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
    humanCost: '$75k/year',
    aiCost: '$1.5k/year',
    efficiency: '20x efficiency improvement',
    replacesRole: '${agentData.name.replace('AI ', '')}',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4,500',
      tasksAutomatedDaily: 100,
      responseTime: '<1s',
      accuracyRate: '96%',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
`;
}

function updateMainAgentPage(filePath, department) {
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

  const agentData = generateAgentData(agentId, department);

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

function getMainAgentFiles(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return [];
  }
  
  const files = [];
  const items = fs.readdirSync(dirPath);
  
  items.forEach(item => {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    
    // Only include files directly in the directory (not in sub-agents)
    if (!stat.isDirectory() && item.endsWith('.tsx')) {
      files.push(fullPath);
    }
  });
  
  return files;
}

// Main execution
console.log('🚀 Starting main agent page updates...\n');

let successCount = 0;
let failCount = 0;
let skipCount = 0;

// Update main agent directories
mainAgentDirectories.forEach(dirPath => {
  const fullPath = path.join(__dirname, '..', dirPath);
  const department = path.basename(fullPath);
  
  if (fs.existsSync(fullPath)) {
    const files = getMainAgentFiles(fullPath);
    files.forEach(filePath => {
      const success = updateMainAgentPage(filePath, department);
      if (success) successCount++;
      else skipCount++;
    });
  } else {
    console.log(`⚠️  Directory not found: ${fullPath}`);
    skipCount++;
  }
});

console.log(`\n📊 Summary:`);
console.log(`✅ Successfully updated: ${successCount}`);
console.log(`❌ Failed: ${failCount}`);
console.log(`⏭️  Skipped (already updated or index): ${skipCount}`);
console.log(`📋 Total processed: ${successCount + failCount + skipCount}`);
