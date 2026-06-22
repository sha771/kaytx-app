import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-chief-financial-officer',
    uid: 'ktx-05-chief-financial-officer',
    name: 'AI Chief Financial Officer',
    title: 'AI Chief Financial Officer',
    description: 'AI Chief Financial Officer leads strategic direction and executive decision-making for the Finance & Accounting department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Tax Compliance', 'Revenue Recognition', 'Expense Tracking', 'Audit Preparation', 'Cash Flow Analysis'],
    color: '#2E7D32',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '77% efficiency',
    replacesRole: 'AI Chief Financial Officer',
    subAgents: [
      { id: 'ai-financial-strategy-advisor', uid: 'ktx-05-financial-strategy-advisor', name: 'AI Financial Strategy Advisor', title: 'AI Financial Strategy Advisor', route: '/ai-agent/finance/financial-strategy-advisor' },
      { id: 'ai-investor-query-responder', uid: 'ktx-05-investor-query-responder', name: 'AI Investor Query Responder', title: 'AI Investor Query Responder', route: '/ai-agent/finance/investor-query-responder' },
      { id: 'ai-benchmark-comparator', uid: 'ktx-05-benchmark-comparator', name: 'AI Benchmark Comparator', title: 'AI Benchmark Comparator', route: '/ai-agent/finance/benchmark-comparator' }
    ],
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11562',
      tasksAutomatedDaily: 598,
      responseTime: '2.3s',
      accuracyRate: '94.5%',
    },
    hierarchy: {
      department: 'Finance & Accounting',
      level: 'c_level',
      departmentId: 5,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
