import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-space-planner',
    uid: 'ktx-13-space-planner',
    name: 'AI Space Planner',
    title: 'AI Space Planner',
    description: 'AI Space Planner provides specialized expertise and executes critical tasks for the Administrative department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Document Management', 'Scheduling', 'Office Management', 'Records Keeping', 'Communication Coordination'],
    color: '#795548',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '87% efficiency',
    replacesRole: 'AI Space Planner',
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3424',
      tasksAutomatedDaily: 372,
      responseTime: '1.6s',
      accuracyRate: '97.7%',
    },
    hierarchy: {
      department: 'Administrative',
      level: 'specialist',
      departmentId: 13,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
