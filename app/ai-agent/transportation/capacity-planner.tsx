import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-capacity-planner',
    uid: 'ktx-19-capacity-planner',
    name: 'AI Capacity Planner',
    title: 'AI Capacity Planner',
    description: 'AI Capacity Planner provides specialized expertise and executes critical tasks for the Transportation & Logistics department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Warehouse Management', 'Carrier Relations', 'Customs Compliance', 'Demand Forecasting', 'Logistics Analytics'],
    color: '#26A69A',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '88% efficiency',
    replacesRole: 'AI Capacity Planner',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3691',
      tasksAutomatedDaily: 423,
      responseTime: '1.8s',
      accuracyRate: '98.4%',
    },
    hierarchy: {
      department: 'Transportation & Logistics',
      level: 'specialist',
      departmentId: 19,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
