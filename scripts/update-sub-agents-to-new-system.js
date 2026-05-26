const fs = require('fs');
const path = require('path');

// List of sub-agent pages to update
const subAgentPages = [
  // Administrative sub-agents
  'app/ai-agent/administrative/sub-agents/visitor-host.tsx',
  'app/ai-agent/administrative/sub-agents/visa-documenter.tsx',
  'app/ai-agent/administrative/sub-agents/version-manager.tsx',
  'app/ai-agent/administrative/sub-agents/vendor-manager.tsx',
  'app/ai-agent/administrative/sub-agents/vendor-liaison.tsx',
  'app/ai-agent/administrative/sub-agents/travel-booker.tsx',
  'app/ai-agent/administrative/sub-agents/task-delegator.tsx',
  'app/ai-agent/administrative/sub-agents/supply-orderer.tsx',
  'app/ai-agent/administrative/sub-agents/space-planner.tsx',
  'app/ai-agent/administrative/sub-agents/schedule-coordinator.tsx',
  'app/ai-agent/administrative/sub-agents/safety-compliance-checker.tsx',
  'app/ai-agent/administrative/sub-agents/process-standardizer.tsx',
  'app/ai-agent/administrative/sub-agents/policy-overseer.tsx',
  'app/ai-agent/administrative/sub-agents/office-budget-controller.tsx',
  'app/ai-agent/administrative/sub-agents/meeting-room-booker.tsx',
  'app/ai-agent/administrative/sub-agents/maintenance-scheduler.tsx',
  'app/ai-agent/administrative/sub-agents/itinerary-planner.tsx',
  'app/ai-agent/administrative/sub-agents/inventory-manager.tsx',
  'app/ai-agent/administrative/sub-agents/inspection-scheduler.tsx',
  'app/ai-agent/administrative/sub-agents/expense-reporter.tsx',
  'app/ai-agent/administrative/sub-agents/cost-reduction-analyst.tsx',
  'app/ai-agent/administrative/sub-agents/correspondence-drafter.tsx',
  'app/ai-agent/administrative/sub-agents/calendar-optimizer.tsx',
  'app/ai-agent/administrative/sub-agents/archive-organizer.tsx',
  'app/ai-agent/administrative/sub-agents/admin-strategy-planner.tsx',
  'app/ai-agent/administrative/sub-agents/access-controller.tsx',
];

// Agent data mapping (simplified - in production, this would be extracted from existing files)
const agentDataMap = {
  'visitor-host': {
    name: 'AI Visitor Host',
    title: 'Hospitality Sub-Agent',
    description: 'Manages visitor registration, badge issuance, and lobby coordination with automated check-in processes and host notification systems.',
    color: '#8B5CF6',
    icon: 'Users',
  },
  'visa-documenter': {
    name: 'AI Visa Documenter',
    title: 'Compliance Sub-Agent',
    description: 'Handles visa documentation, application processing, and compliance tracking with automated form generation and status monitoring.',
    color: '#06B6D4',
    icon: 'FileText',
  },
  'version-manager': {
    name: 'AI Version Manager',
    title: 'IT Sub-Agent',
    description: 'Manages software versioning, deployment tracking, and rollback procedures with automated version control integration.',
    color: '#10B981',
    icon: 'GitBranch',
  },
  'vendor-manager': {
    name: 'AI Vendor Manager',
    title: 'Procurement Sub-Agent',
    description: 'Manages vendor relationships, contract tracking, and performance evaluation with automated procurement workflows.',
    color: '#F59E0B',
    icon: 'Building2',
  },
  'vendor-liaison': {
    name: 'AI Vendor Liaison',
    title: 'Communication Sub-Agent',
    description: 'Handles vendor communications, negotiation support, and relationship management with automated correspondence tracking.',
    color: '#EC4899',
    icon: 'MessageSquare',
  },
  'travel-booker': {
    name: 'AI Travel Booker',
    title: 'Logistics Sub-Agent',
    description: 'Manages travel booking, itinerary management, and expense tracking with automated travel policy compliance.',
    color: '#3B82F6',
    icon: 'Plane',
  },
  'task-delegator': {
    name: 'AI Task Delegator',
    title: 'Operations Sub-Agent',
    description: 'Handles task assignment, workload distribution, and delegation optimization with automated priority management.',
    color: '#6366F1',
    icon: 'Share2',
  },
  'supply-orderer': {
    name: 'AI Supply Orderer',
    title: 'Procurement Sub-Agent',
    description: 'Manages supply ordering, inventory tracking, and vendor coordination with automated reorder triggers.',
    color: '#14B8A6',
    icon: 'Package',
  },
  'space-planner': {
    name: 'AI Space Planner',
    title: 'Facilities Sub-Agent',
    description: 'Handles space allocation, desk assignment, and utilization optimization with automated capacity planning.',
    color: '#8B5CF6',
    icon: 'Layout',
  },
  'schedule-coordinator': {
    name: 'AI Schedule Coordinator',
    title: 'Operations Sub-Agent',
    description: 'Manages meeting scheduling, conflict resolution, and calendar optimization with automated availability checking.',
    color: '#F97316',
    icon: 'Calendar',
  },
  'safety-compliance-checker': {
    name: 'AI Safety Compliance Checker',
    title: 'Compliance Sub-Agent',
    description: 'Monitors safety compliance, conducts audits, and manages incident reporting with automated regulatory tracking.',
    color: '#EF4444',
    icon: 'Shield',
  },
  'process-standardizer': {
    name: 'AI Process Standardizer',
    title: 'Operations Sub-Agent',
    description: 'Standardizes business processes, documents workflows, and ensures consistency with automated template generation.',
    color: '#0EA5E9',
    icon: 'Workflow',
  },
  'policy-overseer': {
    name: 'AI Policy Overseer',
    title: 'Compliance Sub-Agent',
    description: 'Oversees policy implementation, monitors compliance, and manages policy updates with automated enforcement.',
    color: '#64748B',
    icon: 'Scroll',
  },
  'office-budget-controller': {
    name: 'AI Office Budget Controller',
    title: 'Finance Sub-Agent',
    description: 'Manages office budget tracking, expense monitoring, and cost control with automated variance analysis.',
    color: '#059669',
    icon: 'DollarSign',
  },
  'meeting-room-booker': {
    name: 'AI Meeting Room Booker',
    title: 'Facilities Sub-Agent',
    description: 'Handles meeting room reservations, equipment booking, and setup coordination with automated conflict detection.',
    color: '#7C3AED',
    icon: 'Video',
  },
  'maintenance-scheduler': {
    name: 'AI Maintenance Scheduler',
    title: 'Facilities Sub-Agent',
    description: 'Schedules preventive maintenance, tracks work orders, and coordinates vendor dispatch with automated SLA monitoring.',
    color: '#DC2626',
    icon: 'Wrench',
  },
  'itinerary-planner': {
    name: 'AI Itinerary Planner',
    title: 'Logistics Sub-Agent',
    description: 'Plans travel itineraries, coordinates logistics, and manages travel documents with automated optimization.',
    color: '#2563EB',
    icon: 'Map',
  },
  'inventory-manager': {
    name: 'AI Inventory Manager',
    title: 'Operations Sub-Agent',
    description: 'Manages inventory tracking, stock levels, and reorder points with automated demand forecasting.',
    color: '#0891B2',
    icon: 'Box',
  },
  'inspection-scheduler': {
    name: 'AI Inspection Scheduler',
    title: 'Compliance Sub-Agent',
    description: 'Schedules facility inspections, tracks compliance status, and manages corrective actions with automated reminders.',
    color: '#BE123C',
    icon: 'ClipboardCheck',
  },
  'expense-reporter': {
    name: 'AI Expense Reporter',
    title: 'Finance Sub-Agent',
    description: 'Processes expense reports, validates receipts, and manages reimbursements with automated policy checking.',
    color: '#4338CA',
    icon: 'Receipt',
  },
  'cost-reduction-analyst': {
    name: 'AI Cost Reduction Analyst',
    title: 'Finance Sub-Agent',
    description: 'Analyzes cost structures, identifies savings opportunities, and tracks reduction initiatives with automated reporting.',
    color: '#15803D',
    icon: 'TrendingDown',
  },
  'correspondence-drafter': {
    name: 'AI Correspondence Drafter',
    title: 'Communication Sub-Agent',
    description: 'Drafts business correspondence, manages templates, and ensures consistency with automated style checking.',
    color: '#7C2D12',
    icon: 'PenTool',
  },
  'calendar-optimizer': {
    name: 'AI Calendar Optimizer',
    title: 'Operations Sub-Agent',
    description: 'Optimizes calendar schedules, reduces conflicts, and improves time management with automated scheduling.',
    color: '#9333EA',
    icon: 'CalendarClock',
  },
  'archive-organizer': {
    name: 'AI Archive Organizer',
    title: 'Records Sub-Agent',
    description: 'Organizes document archives, manages retention schedules, and ensures compliance with automated categorization.',
    color: '#475569',
    icon: 'Archive',
  },
  'admin-strategy-planner': {
    name: 'AI Admin Strategy Planner',
    title: 'Strategy Sub-Agent',
    description: 'Plans administrative strategies, develops improvement initiatives, and tracks progress with automated reporting.',
    color: '#1E40AF',
    icon: 'Lightbulb',
  },
  'access-controller': {
    name: 'AI Access Controller',
    title: 'Security Sub-Agent',
    description: 'Manages access permissions, controls entry points, and monitors security with automated authentication.',
    color: '#991B1B',
    icon: 'Lock',
  },
};

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

function updateSubAgentPage(filePath) {
  const agentId = path.basename(filePath, '.tsx');
  const agentData = agentDataMap[agentId];

  if (!agentData) {
    console.log(`⚠️  No agent data found for: ${agentId}`);
    return false;
  }

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
console.log('🚀 Starting sub-agent page updates...\n');

let successCount = 0;
let failCount = 0;

subAgentPages.forEach(filePath => {
  const fullPath = path.join(__dirname, '..', filePath);
  if (fs.existsSync(fullPath)) {
    const success = updateSubAgentPage(fullPath);
    if (success) successCount++;
    else failCount++;
  } else {
    console.log(`⚠️  File not found: ${fullPath}`);
    failCount++;
  }
});

console.log(`\n📊 Summary:`);
console.log(`✅ Successfully updated: ${successCount}`);
console.log(`❌ Failed/skipped: ${failCount}`);
console.log(`📋 Total processed: ${subAgentPages.length}`);
