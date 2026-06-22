import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-safety-trainer',
    uid: 'ktx-18-safety-trainer',
    name: 'AI Safety Trainer',
    title: 'AI Safety Trainer',
    description: 'AI Safety Trainer provides specialized expertise and executes critical tasks for the Manufacturing & Production department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Quality Control', 'Inventory Management', 'Equipment Maintenance', 'Lean Manufacturing', 'Supply Coordination'],
    color: '#5C6BC0',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '94% efficiency',
    replacesRole: 'AI Safety Trainer',
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
      department: 'Manufacturing & Production',
      level: 'specialist',
      departmentId: 18,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
