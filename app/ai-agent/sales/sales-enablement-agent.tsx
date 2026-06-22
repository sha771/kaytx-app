import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-sales-enablement-agent',
    uid: 'ktx-02-sales-enablement-agent',
    name: 'AI Sales Enablement Agent',
    title: 'AI Sales Enablement Agent',
    description: 'AI Sales Enablement Agent coordinates team activities and ensures quality output for the Sales & Revenue department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Pipeline Management', 'Sales Forecasting', 'CRM Integration', 'Deal Tracking', 'Revenue Optimization'],
    color: '#FFA000',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '90% efficiency',
    replacesRole: 'AI Sales Enablement Agent',
    subAgents: [
      { id: 'ai-sales-process-auditor', uid: 'ktx-02-sales-process-auditor', name: 'AI Sales Process Auditor', title: 'AI Sales Process Auditor', route: '/ai-agent/sales/sales-process-auditor' },
      { id: 'ai-template-selector', uid: 'ktx-02-template-selector', name: 'AI Template Selector', title: 'AI Template Selector', route: '/ai-agent/sales/template-selector' },
      { id: 'ai-playbook-updater', uid: 'ktx-02-playbook-updater', name: 'AI Playbook Updater', title: 'AI Playbook Updater', route: '/ai-agent/sales/playbook-updater' }
    ],
    infrastructure: {
      status: 'online',
      health: 85,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4225',
      tasksAutomatedDaily: 125,
      responseTime: '2.3s',
      accuracyRate: '94.3%',
    },
    hierarchy: {
      department: 'Sales & Revenue',
      level: 'team_lead',
      departmentId: 2,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
