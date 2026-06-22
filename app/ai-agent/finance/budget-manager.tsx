import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-budget-manager',
    uid: 'ktx-05-budget-manager',
    name: 'AI Budget Manager',
    title: 'AI Budget Manager',
    description: 'AI Budget Manager manages team operations and ensures delivery excellence for the Finance & Accounting department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Budget Management', 'Tax Compliance', 'Revenue Recognition', 'Expense Tracking', 'Audit Preparation'],
    color: '#2E7D32',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '94% efficiency',
    replacesRole: 'AI Budget Manager',
    subAgents: [
      { id: 'ai-liquidity-manager', uid: 'ktx-05-liquidity-manager', name: 'AI Liquidity Manager', title: 'AI Liquidity Manager', route: '/ai-agent/finance/liquidity-manager' },
      { id: 'ai-sub-ledger-reconciler', uid: 'ktx-05-sub-ledger-reconciler', name: 'AI Sub-ledger Reconciler', title: 'AI Sub-ledger Reconciler', route: '/ai-agent/finance/sub-ledger-reconciler' },
      { id: 'ai-remediation-follow-upper', uid: 'ktx-05-remediation-follow-upper', name: 'AI Remediation Follow-upper', title: 'AI Remediation Follow-upper', route: '/ai-agent/finance/remediation-follow-upper' }
    ],
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
      level: 'manager',
      departmentId: 5,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
