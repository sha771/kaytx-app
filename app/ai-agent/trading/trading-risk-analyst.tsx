import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-trading-risk-analyst',
    uid: 'ktx-14-trading-risk-analyst',
    name: 'AI Trading Risk Analyst',
    title: 'AI Trading Risk Analyst',
    description: 'AI Trading Risk Analyst coordinates team activities and ensures quality output for the Trading & Investments department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Quantitative Modeling', 'Portfolio Management', 'Market Analysis', 'Risk Assessment', 'Trade Execution'],
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '76% efficiency',
    replacesRole: 'AI Trading Risk Analyst',
    subAgents: [
      { id: 'ai-market-openclosing-coordinator', uid: 'ktx-14-market-openclosing-coordinator', name: 'AI Market Open/Closing Coordinator', title: 'AI Market Open/Closing Coordinator', route: '/ai-agent/trading/market-openclosing-coordinator' },
      { id: 'ai-volatility-surface-mapper', uid: 'ktx-14-volatility-surface-mapper', name: 'AI Volatility Surface Mapper', title: 'AI Volatility Surface Mapper', route: '/ai-agent/trading/volatility-surface-mapper' },
      { id: 'ai-geopolitical-risk-assessor', uid: 'ktx-14-geopolitical-risk-assessor', name: 'AI Geopolitical Risk Assessor', title: 'AI Geopolitical Risk Assessor', route: '/ai-agent/trading/geopolitical-risk-assessor' }
    ],
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4047',
      tasksAutomatedDaily: 491,
      responseTime: '2.1s',
      accuracyRate: '99.3%',
    },
    hierarchy: {
      department: 'Trading & Investments',
      level: 'team_lead',
      departmentId: 14,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
