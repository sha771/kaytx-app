import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-audit-manager',
    uid: 'ktx-05-audit-manager',
    name: 'AI Audit Manager',
    title: 'AI Audit Manager',
    description: 'AI Audit Manager manages team operations and ensures delivery excellence for the Finance & Accounting department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Financial Modeling', 'Budget Management', 'Tax Compliance', 'Revenue Recognition', 'Expense Tracking'],
    color: '#2E7D32',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '87% efficiency',
    replacesRole: 'AI Audit Manager',
    subAgents: [
      { id: 'ai-bank-relationship-coordinator', uid: 'ktx-05-bank-relationship-coordinator', name: 'AI Bank Relationship Coordinator', title: 'AI Bank Relationship Coordinator', route: '/ai-agent/finance/bank-relationship-coordinator' },
      { id: 'ai-ratio-calculator', uid: 'ktx-05-ratio-calculator', name: 'AI Ratio Calculator', title: 'AI Ratio Calculator', route: '/ai-agent/finance/ratio-calculator' },
      { id: 'ai-investment-yield-tracker', uid: 'ktx-05-investment-yield-tracker', name: 'AI Investment Yield Tracker', title: 'AI Investment Yield Tracker', route: '/ai-agent/finance/investment-yield-tracker' }
    ],
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3424',
      tasksAutomatedDaily: 372,
      responseTime: '1.6s',
      accuracyRate: '97.7%',
    },
    hierarchy: {
      department: 'Finance & Accounting',
      level: 'manager',
      departmentId: 5,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
