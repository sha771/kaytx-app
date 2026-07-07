import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-demo-builder',
    uid: 'ktx-12-demo-builder',
    name: 'AI Demo Builder',
    title: 'AI Demo Builder',
    description: 'AI Demo Builder provides specialized expertise and executes critical tasks for the Research & Development department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Technology Scouting', 'Research Methodology', 'Patent Analysis', 'Prototype Development', 'Lab Management'],
    color: '#009688',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '80% efficiency',
    replacesRole: 'AI Demo Builder',
    infrastructure: {
      status: 'online',
      health: 85,
      uptime: '99.2%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3335',
      tasksAutomatedDaily: 355,
      responseTime: '1.6s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Research & Development',
      level: 'specialist',
      departmentId: 12,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
