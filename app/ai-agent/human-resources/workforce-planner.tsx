import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-workforce-planner',
    uid: 'ktx-07-workforce-planner',
    name: 'AI Workforce Planner',
    title: 'AI Workforce Planner',
    description: 'AI Workforce Planner provides specialized expertise and executes critical tasks for the Human Resources department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Compensation Analysis', 'Culture Development', 'HR Compliance', 'Workforce Planning', 'Talent Acquisition'],
    color: '#9C27B0',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '75% efficiency',
    replacesRole: 'AI Workforce Planner',
    infrastructure: {
      status: 'online',
      health: 85,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3780',
      tasksAutomatedDaily: 440,
      responseTime: '1.9s',
      accuracyRate: '98.6%',
    },
    hierarchy: {
      department: 'Human Resources',
      level: 'specialist',
      departmentId: 7,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
