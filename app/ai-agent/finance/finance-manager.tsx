import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-finance-manager',
    uid: 'ktx-05-finance-manager',
    name: 'AI Finance Manager',
    title: 'AI Finance Manager',
    description: 'AI Finance Manager manages team operations and ensures delivery excellence for the Finance & Accounting department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Tax Compliance', 'Revenue Recognition', 'Expense Tracking', 'Audit Preparation', 'Cash Flow Analysis'],
    color: '#2E7D32',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '81% efficiency',
    replacesRole: 'AI Finance Manager',
    subAgents: [
      { id: 'ai-ledger-reconciler', uid: 'ktx-05-ledger-reconciler', name: 'AI Ledger Reconciler', title: 'AI Ledger Reconciler', route: '/ai-agent/finance/ledger-reconciler' },
      { id: 'ai-expense-approver', uid: 'ktx-05-expense-approver', name: 'AI Expense Approver', title: 'AI Expense Approver', route: '/ai-agent/finance/expense-approver' },
      { id: 'ai-deduction-optimizer', uid: 'ktx-05-deduction-optimizer', name: 'AI Deduction Optimizer', title: 'AI Deduction Optimizer', route: '/ai-agent/finance/deduction-optimizer' }
    ],
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3602',
      tasksAutomatedDaily: 406,
      responseTime: '1.8s',
      accuracyRate: '98.1%',
    },
    hierarchy: {
      department: 'Finance & Accounting',
      level: 'manager',
      departmentId: 5,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
