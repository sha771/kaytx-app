import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-cost-optimizer',
    uid: 'ktx-21-cost-optimizer',
    name: 'AI Cost Optimizer',
    title: 'AI Cost Optimizer',
    description: 'AI Cost Optimizer provides specialized expertise and executes critical tasks for the Supply Chain & Logistics department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Procurement', 'Inventory Management', 'Supplier Relations', 'Demand Planning', 'Logistics Coordination'],
    color: '#42A5F5',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '94% efficiency',
    replacesRole: 'AI Cost Optimizer',
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
      level: 'specialist',
      departmentId: 21,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
