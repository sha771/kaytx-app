import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-accounting',
    uid: 'ktx-05-vp-accounting',
    name: 'AI VP Accounting',
    title: 'AI VP Accounting',
    description: 'AI VP Accounting drives department strategy and oversees operations for the Finance & Accounting department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Financial Modeling', 'Budget Management', 'Tax Compliance', 'Revenue Recognition', 'Expense Tracking'],
    color: '#2E7D32',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$1,800/mo',
    efficiency: '87% efficiency',
    replacesRole: 'AI VP Accounting',
    subAgents: [
      { id: 'ai-risk-reward-analyst', uid: 'ktx-05-risk-reward-analyst', name: 'AI Risk-Reward Analyst', title: 'AI Risk-Reward Analyst', route: '/ai-agent/finance/risk-reward-analyst' },
      { id: 'ai-gl-reviewer', uid: 'ktx-05-gl-reviewer', name: 'AI GL Reviewer', title: 'AI GL Reviewer', route: '/ai-agent/finance/gl-reviewer' },
      { id: 'ai-variance-reporter', uid: 'ktx-05-variance-reporter', name: 'AI Variance Reporter', title: 'AI Variance Reporter', route: '/ai-agent/finance/variance-reporter' }
    ],
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$10192',
      tasksAutomatedDaily: 868,
      responseTime: '1.6s',
      accuracyRate: '97.7%',
    },
    hierarchy: {
      department: 'Finance & Accounting',
      level: 'vp_director',
      departmentId: 5,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
