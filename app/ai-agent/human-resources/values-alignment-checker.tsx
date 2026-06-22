import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-values-alignment-checker',
    uid: 'ktx-07-values-alignment-checker',
    name: 'AI Values Alignment Checker',
    title: 'AI Values Alignment Checker',
    description: 'AI Values Alignment Checker provides specialized expertise and executes critical tasks for the Human Resources department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Training Programs', 'Compensation Analysis', 'Culture Development', 'HR Compliance', 'Workforce Planning'],
    color: '#9C27B0',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '84% efficiency',
    replacesRole: 'AI Values Alignment Checker',
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
      department: 'Human Resources',
      level: 'specialist',
      departmentId: 7,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
