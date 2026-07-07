import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-chief-investment-officer',
    uid: 'ktx-14-chief-investment-officer',
    name: 'AI Chief Investment Officer',
    title: 'AI Chief Investment Officer',
    description: 'AI Chief Investment Officer leads strategic direction and executive decision-making for the Trading & Investments department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Trade Execution', 'Compliance Monitoring', 'Performance Attribution', 'Derivatives Pricing', 'Quantitative Modeling'],
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '84% efficiency',
    replacesRole: 'AI Chief Investment Officer',
    subAgents: [
      { id: 'ai-investment-strategy-advisor', uid: 'ktx-14-investment-strategy-advisor', name: 'AI Investment Strategy Advisor', title: 'AI Investment Strategy Advisor', route: '/ai-agent/trading/investment-strategy-advisor' },
      { id: 'ai-order-executor', uid: 'ktx-14-order-executor', name: 'AI Order Executor', title: 'AI Order Executor', route: '/ai-agent/trading/order-executor' },
      { id: 'ai-trade-surveillance-agent', uid: 'ktx-14-trade-surveillance-agent', name: 'AI Trade Surveillance Agent', title: 'AI Trade Surveillance Agent', route: '/ai-agent/trading/trade-surveillance-agent' }
    ],
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11699',
      tasksAutomatedDaily: 621,
      responseTime: '2.4s',
      accuracyRate: '94.7%',
    },
    hierarchy: {
      department: 'Trading & Investments',
      level: 'c_level',
      departmentId: 14,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
