import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-material-requirements-planner',
    uid: 'ktx-18-material-requirements-planner',
    name: 'AI Material Requirements Planner',
    title: 'AI Material Requirements Planner',
    description: 'AI Material Requirements Planner provides specialized expertise and executes critical tasks for the Manufacturing & Production department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Production Planning', 'Quality Control', 'Inventory Management', 'Equipment Maintenance', 'Lean Manufacturing'],
    color: '#5C6BC0',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '79% efficiency',
    replacesRole: 'AI Material Requirements Planner',
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4848',
      tasksAutomatedDaily: 244,
      responseTime: '0.7s',
      accuracyRate: '95.9%',
    },
    hierarchy: {
      department: 'Manufacturing & Production',
      level: 'specialist',
      departmentId: 18,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
