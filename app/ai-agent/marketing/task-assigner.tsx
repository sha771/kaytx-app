import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-task-assigner',
    uid: 'ktx-03-task-assigner',
    name: 'AI Task Assigner',
    title: 'AI Task Assigner',
    description: 'AI Task Assigner provides specialized expertise and executes critical tasks for the Marketing & Growth department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Campaign Management', 'SEO Optimization', 'Content Strategy', 'Social Media Analytics', 'Brand Management'],
    color: '#E91E63',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '87% efficiency',
    replacesRole: 'AI Task Assigner',
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
      department: 'Marketing & Growth',
      level: 'specialist',
      departmentId: 3,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
