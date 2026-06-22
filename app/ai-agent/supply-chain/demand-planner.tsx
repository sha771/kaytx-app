import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-demand-planner',
    uid: 'ktx-21-demand-planner',
    name: 'AI Demand Planner',
    title: 'AI Demand Planner',
    description: 'AI Demand Planner coordinates team activities and ensures quality output for the Supply Chain & Logistics department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Procurement', 'Inventory Management', 'Supplier Relations', 'Demand Planning', 'Logistics Coordination'],
    color: '#42A5F5',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '94% efficiency',
    replacesRole: 'AI Demand Planner',
    subAgents: [
      { id: 'ai-transport-mode-selector', uid: 'ktx-21-transport-mode-selector', name: 'AI Transport Mode Selector', title: 'AI Transport Mode Selector', route: '/ai-agent/supply-chain/transport-mode-selector' },
      { id: 'ai-abc-analyzer', uid: 'ktx-21-abc-analyzer', name: 'AI ABC Analyzer', title: 'AI ABC Analyzer', route: '/ai-agent/supply-chain/abc-analyzer' },
      { id: 'ai-tracking-monitor', uid: 'ktx-21-tracking-monitor', name: 'AI Tracking Monitor', title: 'AI Tracking Monitor', route: '/ai-agent/supply-chain/tracking-monitor' }
    ],
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3513',
      tasksAutomatedDaily: 389,
      responseTime: '1.7s',
      accuracyRate: '97.9%',
    },
    hierarchy: {
      department: 'Supply Chain & Logistics',
      level: 'team_lead',
      departmentId: 21,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
