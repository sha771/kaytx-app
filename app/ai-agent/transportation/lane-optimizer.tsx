import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-lane-optimizer',
    uid: 'ktx-19-lane-optimizer',
    name: 'AI Lane Optimizer',
    title: 'AI Lane Optimizer',
    description: 'AI Lane Optimizer provides specialized expertise and executes critical tasks for the Transportation & Logistics department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Route Optimization', 'Shipment Tracking', 'Warehouse Management', 'Carrier Relations', 'Customs Compliance'],
    color: '#26A69A',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '94% efficiency',
    replacesRole: 'AI Lane Optimizer',
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
      department: 'Transportation & Logistics',
      level: 'specialist',
      departmentId: 19,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
