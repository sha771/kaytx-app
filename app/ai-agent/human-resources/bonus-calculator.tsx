import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-bonus-calculator',
    uid: 'ktx-07-bonus-calculator',
    name: 'AI Bonus Calculator',
    title: 'AI Bonus Calculator',
    description: 'AI Bonus Calculator provides specialized expertise and executes critical tasks for the Human Resources department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Training Programs', 'Compensation Analysis', 'Culture Development', 'HR Compliance', 'Workforce Planning'],
    color: '#9C27B0',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '88% efficiency',
    replacesRole: 'AI Bonus Calculator',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3691',
      tasksAutomatedDaily: 423,
      responseTime: '1.8s',
      accuracyRate: '98.4%',
    },
    hierarchy: {
      department: 'Human Resources',
      level: 'specialist',
      departmentId: 7,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
