import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-debt-schedule-manager',
    uid: 'ktx-05-debt-schedule-manager',
    name: 'AI Debt Schedule Manager',
    title: 'AI Debt Schedule Manager',
    description: 'AI Debt Schedule Manager manages team operations and ensures delivery excellence for the Finance & Accounting department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Financial Modeling', 'Budget Management', 'Tax Compliance', 'Revenue Recognition', 'Expense Tracking'],
    color: '#2E7D32',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '83% efficiency',
    replacesRole: 'AI Debt Schedule Manager',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4136',
      tasksAutomatedDaily: 108,
      responseTime: '2.2s',
      accuracyRate: '94.0%',
    },
    hierarchy: {
      department: 'Finance & Accounting',
      level: 'manager',
      departmentId: 5,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
