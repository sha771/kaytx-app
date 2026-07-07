import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-macro-analyst',
    uid: 'ktx-14-macro-analyst',
    name: 'AI Macro Analyst',
    title: 'AI Macro Analyst',
    description: 'AI Macro Analyst leads strategic direction and executive decision-making for the Trading & Investments department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Portfolio Management', 'Market Analysis', 'Risk Assessment', 'Trade Execution', 'Compliance Monitoring'],
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '87% efficiency',
    replacesRole: 'AI Macro Analyst',
    subAgents: [
      { id: 'ai-var-calculator', uid: 'ktx-14-var-calculator', name: 'AI VaR Calculator', title: 'AI VaR Calculator', route: '/ai-agent/trading/var-calculator' },
      { id: 'ai-scenario-modeler', uid: 'ktx-14-scenario-modeler', name: 'AI Scenario Modeler', title: 'AI Scenario Modeler', route: '/ai-agent/trading/scenario-modeler' },
      { id: 'ai-trade-reconciler', uid: 'ktx-14-trade-reconciler', name: 'AI Trade Reconciler', title: 'AI Trade Reconciler', route: '/ai-agent/trading/trade-reconciler' }
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
      department: 'Trading & Investments',
      level: 'c_level',
      departmentId: 14,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
