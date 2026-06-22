import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-transport-mode-selector',
    uid: 'ktx-21-transport-mode-selector',
    name: 'AI Transport Mode Selector',
    title: 'AI Transport Mode Selector',
    description: 'AI Transport Mode Selector leads strategic direction and executive decision-making for the Supply Chain & Logistics department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Inventory Management', 'Supplier Relations', 'Demand Planning', 'Logistics Coordination', 'Cost Reduction'],
    color: '#42A5F5',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '77% efficiency',
    replacesRole: 'AI Transport Mode Selector',
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11562',
      tasksAutomatedDaily: 598,
      responseTime: '2.3s',
      accuracyRate: '94.5%',
    },
    hierarchy: {
      department: 'Supply Chain & Logistics',
      level: 'c_level',
      departmentId: 21,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
