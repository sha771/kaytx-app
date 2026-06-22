import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-expense-reporter',
    uid: 'ktx-13-expense-reporter',
    name: 'AI Expense Reporter',
    title: 'AI Expense Reporter',
    description: 'AI Expense Reporter provides specialized expertise and executes critical tasks for the Administrative department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Records Keeping', 'Communication Coordination', 'Travel Planning', 'Meeting Facilitation', 'Administrative Reporting'],
    color: '#795548',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '88% efficiency',
    replacesRole: 'AI Expense Reporter',
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
      department: 'Administrative',
      level: 'specialist',
      departmentId: 13,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
