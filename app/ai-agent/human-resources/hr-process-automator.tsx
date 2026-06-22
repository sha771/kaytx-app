import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-hr-process-automator',
    uid: 'ktx-07-hr-process-automator',
    name: 'AI HR Process Automator',
    title: 'AI HR Process Automator',
    description: 'AI HR Process Automator provides specialized expertise and executes critical tasks for the Human Resources department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Workforce Planning', 'Talent Acquisition', 'Employee Onboarding', 'Performance Reviews', 'Training Programs'],
    color: '#9C27B0',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '76% efficiency',
    replacesRole: 'AI HR Process Automator',
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4047',
      tasksAutomatedDaily: 491,
      responseTime: '2.1s',
      accuracyRate: '99.3%',
    },
    hierarchy: {
      department: 'Human Resources',
      level: 'specialist',
      departmentId: 7,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
