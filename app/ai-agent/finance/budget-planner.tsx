import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-budget-planner',
    uid: 'ktx-05-budget-planner',
    name: 'AI Budget Planner',
    title: 'AI Budget Planner',
    description: 'AI Budget Planner provides specialized expertise and executes critical tasks for the Finance & Accounting department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Budget Management', 'Tax Compliance', 'Revenue Recognition', 'Expense Tracking', 'Audit Preparation'],
    color: '#2E7D32',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '94% efficiency',
    replacesRole: 'AI Budget Planner',
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
      department: 'Finance & Accounting',
      level: 'specialist',
      departmentId: 5,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
