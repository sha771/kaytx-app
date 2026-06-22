import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-chief-risk-officer',
    uid: 'ktx-16-chief-risk-officer',
    name: 'AI Chief Risk Officer',
    title: 'AI Chief Risk Officer',
    description: 'AI Chief Risk Officer leads strategic direction and executive decision-making for the Insurance & Risk department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Premium Calculation', 'Regulatory Compliance', 'Customer Communication', 'Claims Processing', 'Underwriting'],
    color: '#FF7043',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '82% efficiency',
    replacesRole: 'AI Chief Risk Officer',
    subAgents: [
      { id: 'ai-enterprise-risk-strategy-advisor', uid: 'ktx-16-enterprise-risk-strategy-advisor', name: 'AI Enterprise Risk Strategy Advisor', title: 'AI Enterprise Risk Strategy Advisor', route: '/ai-agent/insurance/enterprise-risk-strategy-advisor' },
      { id: 'ai-reserve-reviewer', uid: 'ktx-16-reserve-reviewer', name: 'AI Reserve Reviewer', title: 'AI Reserve Reviewer', route: '/ai-agent/insurance/reserve-reviewer' },
      { id: 'ai-rate-filing-preparer', uid: 'ktx-16-rate-filing-preparer', name: 'AI Rate Filing Preparer', title: 'AI Rate Filing Preparer', route: '/ai-agent/insurance/rate-filing-preparer' }
    ],
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.0%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$10877',
      tasksAutomatedDaily: 983,
      responseTime: '2.0s',
      accuracyRate: '98.8%',
    },
    hierarchy: {
      department: 'Insurance & Risk',
      level: 'c_level',
      departmentId: 16,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
