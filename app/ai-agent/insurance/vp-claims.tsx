import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-claims',
    uid: 'ktx-16-vp-claims',
    name: 'AI VP Claims',
    title: 'AI VP Claims',
    description: 'AI VP Claims drives department strategy and oversees operations for the Insurance & Risk department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Fraud Detection', 'Premium Calculation', 'Regulatory Compliance', 'Customer Communication', 'Claims Processing'],
    color: '#FF7043',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$1,800/mo',
    efficiency: '79% efficiency',
    replacesRole: 'AI VP Claims',
    subAgents: [
      { id: 'ai-board-risk-reporter', uid: 'ktx-16-board-risk-reporter', name: 'AI Board Risk Reporter', title: 'AI Board Risk Reporter', route: '/ai-agent/insurance/board-risk-reporter' },
      { id: 'ai-policy-lifecycle-manager', uid: 'ktx-16-policy-lifecycle-manager', name: 'AI Policy Lifecycle Manager', title: 'AI Policy Lifecycle Manager', route: '/ai-agent/insurance/policy-lifecycle-manager' },
      { id: 'ai-correlation-analyst', uid: 'ktx-16-correlation-analyst', name: 'AI Correlation Analyst', title: 'AI Correlation Analyst', route: '/ai-agent/insurance/correlation-analyst' }
    ],
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$9644',
      tasksAutomatedDaily: 776,
      responseTime: '1.3s',
      accuracyRate: '96.8%',
    },
    hierarchy: {
      department: 'Insurance & Risk',
      level: 'vp_director',
      departmentId: 16,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
