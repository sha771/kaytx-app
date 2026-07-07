import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-patent-drafter',
    uid: 'ktx-12-patent-drafter',
    name: 'AI Patent Drafter',
    title: 'AI Patent Drafter',
    description: 'AI Patent Drafter provides specialized expertise and executes critical tasks for the Research & Development department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Patent Analysis', 'Prototype Development', 'Lab Management', 'Literature Review', 'Experiment Design'],
    color: '#009688',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '94% efficiency',
    replacesRole: 'AI Patent Drafter',
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
      department: 'Research & Development',
      level: 'specialist',
      departmentId: 12,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
