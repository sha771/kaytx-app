import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-rpa-manager',
    uid: 'ktx-21-rpa-manager',
    name: 'AI AI RPA Manager',
    title: 'AI RPA Manager',
    description: 'AI AI RPA Manager manages team operations and ensures delivery excellence for the Supply Chain & Logistics department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Cost Reduction', 'Sustainability Tracking', 'Supply Chain Optimization', 'Procurement', 'Inventory Management'],
    color: '#42A5F5',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '93% efficiency',
    replacesRole: 'AI RPA Manager',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.0%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3246',
      tasksAutomatedDaily: 338,
      responseTime: '1.5s',
      accuracyRate: '97.2%',
    },
    hierarchy: {
      department: 'Supply Chain & Logistics',
      level: 'manager',
      departmentId: 21,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
