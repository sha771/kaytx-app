import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-capacity-loader',
    uid: 'ktx-18-capacity-loader',
    name: 'AI Capacity Loader',
    title: 'AI Capacity Loader',
    description: 'AI Capacity Loader provides specialized expertise and executes critical tasks for the Manufacturing & Production department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Inventory Management', 'Equipment Maintenance', 'Lean Manufacturing', 'Supply Coordination', 'Safety Compliance'],
    color: '#5C6BC0',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '81% efficiency',
    replacesRole: 'AI Capacity Loader',
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3602',
      tasksAutomatedDaily: 406,
      responseTime: '1.8s',
      accuracyRate: '98.1%',
    },
    hierarchy: {
      department: 'Manufacturing & Production',
      level: 'specialist',
      departmentId: 18,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
