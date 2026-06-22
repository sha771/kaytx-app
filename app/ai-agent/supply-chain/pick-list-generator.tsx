import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-pick-list-generator',
    uid: 'ktx-21-pick-list-generator',
    name: 'AI Pick List Generator',
    title: 'AI Pick List Generator',
    description: 'AI Pick List Generator provides specialized expertise and executes critical tasks for the Supply Chain & Logistics department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Cost Reduction', 'Sustainability Tracking', 'Supply Chain Optimization', 'Procurement', 'Inventory Management'],
    color: '#42A5F5',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '89% efficiency',
    replacesRole: 'AI Pick List Generator',
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.2%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3958',
      tasksAutomatedDaily: 474,
      responseTime: '2.0s',
      accuracyRate: '99.1%',
    },
    hierarchy: {
      department: 'Supply Chain & Logistics',
      level: 'specialist',
      departmentId: 21,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
