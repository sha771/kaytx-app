import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-cost-to-serve-analyst',
    uid: 'ktx-19-cost-to-serve-analyst',
    name: 'AI Cost-to-serve Analyst',
    title: 'AI Cost-to-serve Analyst',
    description: 'AI Cost-to-serve Analyst provides specialized expertise and executes critical tasks for the Transportation & Logistics department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Fleet Management', 'Route Optimization', 'Shipment Tracking', 'Warehouse Management', 'Carrier Relations'],
    color: '#26A69A',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '83% efficiency',
    replacesRole: 'AI Cost-to-serve Analyst',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4136',
      tasksAutomatedDaily: 108,
      responseTime: '2.2s',
      accuracyRate: '94.0%',
    },
    hierarchy: {
      department: 'Transportation & Logistics',
      level: 'specialist',
      departmentId: 19,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
