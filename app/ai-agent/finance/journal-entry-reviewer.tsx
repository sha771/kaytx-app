import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-journal-entry-reviewer',
    uid: 'ktx-05-journal-entry-reviewer',
    name: 'AI Journal Entry Reviewer',
    title: 'AI Journal Entry Reviewer',
    description: 'AI Journal Entry Reviewer provides specialized expertise and executes critical tasks for the Finance & Accounting department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Budget Management', 'Tax Compliance', 'Revenue Recognition', 'Expense Tracking', 'Audit Preparation'],
    color: '#2E7D32',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '90% efficiency',
    replacesRole: 'AI Journal Entry Reviewer',
    infrastructure: {
      status: 'online',
      health: 85,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4225',
      tasksAutomatedDaily: 125,
      responseTime: '2.3s',
      accuracyRate: '94.3%',
    },
    hierarchy: {
      department: 'Finance & Accounting',
      level: 'specialist',
      departmentId: 5,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
