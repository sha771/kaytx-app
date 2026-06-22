import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-month-end-coordinator',
    uid: 'ktx-05-month-end-coordinator',
    name: 'AI Month-end Coordinator',
    title: 'AI Month-end Coordinator',
    description: 'AI Month-end Coordinator leads strategic direction and executive decision-making for the Finance & Accounting department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Financial Modeling', 'Budget Management', 'Tax Compliance', 'Revenue Recognition', 'Expense Tracking'],
    color: '#2E7D32',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '83% efficiency',
    replacesRole: 'AI Month-end Coordinator',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11288',
      tasksAutomatedDaily: 552,
      responseTime: '2.2s',
      accuracyRate: '94.0%',
    },
    hierarchy: {
      department: 'Finance & Accounting',
      level: 'c_level',
      departmentId: 5,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
