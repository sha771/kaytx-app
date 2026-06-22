import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-investor-relations',
    uid: 'ktx-05-vp-investor-relations',
    name: 'AI VP Investor Relations',
    title: 'AI VP Investor Relations',
    description: 'AI VP Investor Relations drives department strategy and oversees operations for the Finance & Accounting department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Financial Modeling', 'Budget Management', 'Tax Compliance', 'Revenue Recognition', 'Expense Tracking'],
    color: '#2E7D32',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$1,800/mo',
    efficiency: '83% efficiency',
    replacesRole: 'AI VP Investor Relations',
    subAgents: [
      { id: 'ai-cash-flow-forecaster', uid: 'ktx-05-cash-flow-forecaster', name: 'AI Cash Flow Forecaster', title: 'AI Cash Flow Forecaster', route: '/ai-agent/finance/cash-flow-forecaster' },
      { id: 'ai-internal-policy-enforcer', uid: 'ktx-05-internal-policy-enforcer', name: 'AI Internal Policy Enforcer', title: 'AI Internal Policy Enforcer', route: '/ai-agent/finance/internal-policy-enforcer' },
      { id: 'ai-tax-code-researcher', uid: 'ktx-05-tax-code-researcher', name: 'AI Tax Code Researcher', title: 'AI Tax Code Researcher', route: '/ai-agent/finance/tax-code-researcher' }
    ],
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
      level: 'vp_director',
      departmentId: 5,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
