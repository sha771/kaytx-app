import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-sprint-reviewer',
    uid: 'ktx-10-sprint-reviewer',
    name: 'AI Sprint Reviewer',
    title: 'AI Sprint Reviewer',
    description: 'AI Sprint Reviewer provides specialized expertise and executes critical tasks for the Product Management department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['User Research', 'Sprint Planning', 'A/B Testing', 'Product Analytics', 'Market Analysis'],
    color: '#FF5722',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '81% efficiency',
    replacesRole: 'AI Sprint Reviewer',
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
      department: 'Product Management',
      level: 'specialist',
      departmentId: 10,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
