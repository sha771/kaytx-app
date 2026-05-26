const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// List of all sub-agent directories
const subAgentDirectories = [
  'app/ai-agent/admin/sub-agents',
  'app/ai-agent/ai-mgmt/sub-agents',
  'app/ai-agent/customer/sub-agents',
  'app/ai-agent/data/sub-agents',
  'app/ai-agent/executive/sub-agents',
  'app/ai-agent/finance/sub-agents',
  'app/ai-agent/government/sub-agents',
  'app/ai-agent/healthcare/sub-agents',
  'app/ai-agent/hr/sub-agents',
  'app/ai-agent/insurance/sub-agents',
  'app/ai-agent/legal/sub-agents',
  'app/ai-agent/manufacturing/sub-agents',
  'app/ai-agent/marketing/sub-agents',
  'app/ai-agent/operations/sub-agents',
  'app/ai-agent/product/sub-agents',
  'app/ai-agent/realestate/sub-agents',
  'app/ai-agent/research/sub-agents',
  'app/ai-agent/sales/sub-agents',
  'app/ai-agent/security/sub-agents',
  'app/ai-agent/supply-chain/sub-agents',
  'app/ai-agent/tech/sub-agents',
  'app/ai-agent/trading/sub-agents',
  'app/ai-agent/transportation/sub-agents',
];

// List of direct agent pages (not in sub-agents folders)
const directAgentPages = [
  'app/ai-agent/accounting-finance/accounts-payable.tsx',
  'app/ai-agent/accounting-finance/accounts-receivable.tsx',
  'app/ai-agent/accounting-finance/audit.tsx',
  'app/ai-agent/accounting-finance/bookkeeper.tsx',
  'app/ai-agent/accounting-finance/budgeting.tsx',
  'app/ai-agent/accounting-finance/expense-management.tsx',
  'app/ai-agent/accounting-finance/financial-analyst.tsx',
  'app/ai-agent/accounting-finance/financial-reporting.tsx',
  'app/ai-agent/accounting-finance/inventory-management.tsx',
  'app/ai-agent/accounting-finance/investment.tsx',
  'app/ai-agent/accounting-finance/payroll-accounting.tsx',
  'app/ai-agent/accounting-finance/payroll.tsx',
  'app/ai-agent/accounting-finance/tax.tsx',
  'app/ai-agent/accounting-finance/treasury.tsx',
];

// Generic agent data template
function generateAgentData(agentId, department) {
  const departmentColors = {
    'admin': '#6366F1',
    'ai-mgmt': '#8B5CF6',
    'customer': '#EC4899',
    'data': '#06B6D4',
    'executive': '#1E40AF',
    'finance': '#059669',
    'government': '#475569',
    'healthcare': '#EF4444',
    'hr': '#F97316',
    'insurance': '#0891B2',
    'legal': '#7C2D12',
    'manufacturing': '#DC2626',
    'marketing': '#BE123C',
    'operations': '#F59E0B',
    'product': '#9333EA',
    'realestate': '#15803D',
    'research': '#2563EB',
    'sales': '#4338CA',
    'security': '#991B1B',
    'supply-chain': '#14B8A6',
    'tech': '#0EA5E9',
    'trading': '#10B981',
    'transportation': '#7C3AED',
    'accounting-finance': '#059669',
  };

  const iconMap = {
    'accounts-payable': 'DollarSign',
    'accounts-receivable': 'Receipt',
    'audit': 'ClipboardCheck',
    'bookkeeper': 'Book',
    'budgeting': 'PieChart',
    'expense-management': 'CreditCard',
    'financial-analyst': 'TrendingUp',
    'financial-reporting': 'FileText',
    'inventory-management': 'Box',
    'investment': 'TrendingUp',
    'payroll-accounting': 'Users',
    'payroll': 'Banknote',
    'tax': 'Calculator',
    'treasury': 'Vault',
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
    humanCost: '$50k/year',
    aiCost: '$1.0k/year',
    efficiency: '15x efficiency improvement',
    replacesRole: '${agentData.name.replace('AI ', '')}',
    infrastructure: {
      status: 'online',
      health: 95,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3,200',
      tasksAutomatedDaily: 75,
      responseTime: '<2s',
      accuracyRate: '94%',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
`;
}

function updateSubAgentPage(filePath, department) {
  const agentId = path.basename(filePath, '.tsx');
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

function getFilesInDirectory(dirPath, extension = '.tsx') {
  if (!fs.existsSync(dirPath)) {
    return [];
  }
  
  const files = [];
  const items = fs.readdirSync(dirPath);
  
  items.forEach(item => {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...getFilesInDirectory(fullPath, extension));
    } else if (item.endsWith(extension) && item !== 'index.tsx') {
      files.push(fullPath);
    }
  });
  
  return files;
}

// Main execution
console.log('🚀 Starting comprehensive sub-agent page updates...\n');

let successCount = 0;
let failCount = 0;
let skipCount = 0;

// Update sub-agent directories
console.log('📁 Processing sub-agent directories...\n');
subAgentDirectories.forEach(dirPath => {
  const fullPath = path.join(__dirname, '..', dirPath);
  const department = path.basename(path.dirname(fullPath));
  
  if (fs.existsSync(fullPath)) {
    const files = getFilesInDirectory(fullPath);
    files.forEach(filePath => {
      const success = updateSubAgentPage(filePath, department);
      if (success) successCount++;
      else failCount++;
    });
  } else {
    console.log(`⚠️  Directory not found: ${fullPath}`);
    skipCount++;
  }
});

// Update direct agent pages
console.log('\n📄 Processing direct agent pages...\n');
directAgentPages.forEach(filePath => {
  const fullPath = path.join(__dirname, '..', filePath);
  const department = 'accounting-finance';
  
  if (fs.existsSync(fullPath)) {
    const success = updateSubAgentPage(fullPath, department);
    if (success) successCount++;
    else failCount++;
  } else {
    console.log(`⚠️  File not found: ${fullPath}`);
    skipCount++;
  }
});

console.log(`\n📊 Summary:`);
console.log(`✅ Successfully updated: ${successCount}`);
console.log(`❌ Failed: ${failCount}`);
console.log(`⚠️  Skipped (not found): ${skipCount}`);
console.log(`📋 Total processed: ${successCount + failCount + skipCount}`);
