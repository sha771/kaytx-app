import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-reorder-point-calculator',
    uid: 'ktx-18-reorder-point-calculator',
    name: 'AI Reorder Point Calculator',
    title: 'AI Reorder Point Calculator',
    description: 'AI Reorder Point Calculator provides specialized expertise and executes critical tasks for the Manufacturing & Production department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Equipment Maintenance', 'Lean Manufacturing', 'Supply Coordination', 'Safety Compliance', 'Process Engineering'],
    color: '#5C6BC0',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '84% efficiency',
    replacesRole: 'AI Reorder Point Calculator',
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4403',
      tasksAutomatedDaily: 159,
      responseTime: '2.4s',
      accuracyRate: '94.7%',
    },
    hierarchy: {
      department: 'Manufacturing & Production',
      level: 'specialist',
      departmentId: 18,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
