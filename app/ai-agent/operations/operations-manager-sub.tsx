import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-operations-manager-sub',
    uid: 'ktx-04-operations-manager-sub',
    name: 'AI Operations Manager (sub)',
    title: 'AI Operations Manager (sub)',
    description: 'AI Operations Manager (sub) manages team operations and ensures delivery excellence for the Operations & Management department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Quality Assurance', 'Project Management', 'Capacity Planning', 'Vendor Management', 'Operational Analytics'],
    color: '#607D8B',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '84% efficiency',
    replacesRole: 'AI Operations Manager (sub)',
    subAgents: [
      { id: 'ai-inventory-optimizer', uid: 'ktx-04-inventory-optimizer', name: 'AI Inventory Optimizer', title: 'AI Inventory Optimizer', route: '/ai-agent/operations/inventory-optimizer' },
      { id: 'ai-performance-reporter', uid: 'ktx-04-performance-reporter', name: 'AI Performance Reporter', title: 'AI Performance Reporter', route: '/ai-agent/operations/performance-reporter' },
      { id: 'ai-demand-forecaster', uid: 'ktx-04-demand-forecaster', name: 'AI Demand Forecaster', title: 'AI Demand Forecaster', route: '/ai-agent/operations/demand-forecaster' }
    ],
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4403',
      tasksAutomatedDaily: 159,
      responseTime: '2.4s',
      accuracyRate: '94.7%',
    },
    hierarchy: {
      department: 'Operations & Management',
      level: 'manager',
      departmentId: 4,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
