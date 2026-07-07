import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-forex-trader',
    uid: 'ktx-14-forex-trader',
    name: 'AI Forex Trader',
    title: 'AI Forex Trader',
    description: 'AI Forex Trader coordinates team activities and ensures quality output for the Trading & Investments department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Quantitative Modeling', 'Portfolio Management', 'Market Analysis', 'Risk Assessment', 'Trade Execution'],
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '80% efficiency',
    replacesRole: 'AI Forex Trader',
    subAgents: [
      { id: 'ai-deal-flow-manager', uid: 'ktx-14-deal-flow-manager', name: 'AI Deal Flow Manager', title: 'AI Deal Flow Manager', route: '/ai-agent/trading/deal-flow-manager' },
      { id: 'ai-liquidity-pool-monitor', uid: 'ktx-14-liquidity-pool-monitor', name: 'AI Liquidity Pool Monitor', title: 'AI Liquidity Pool Monitor', route: '/ai-agent/trading/liquidity-pool-monitor' },
      { id: 'ai-sustainability-scorer', uid: 'ktx-14-sustainability-scorer', name: 'AI Sustainability Scorer', title: 'AI Sustainability Scorer', route: '/ai-agent/trading/sustainability-scorer' }
    ],
    infrastructure: {
      status: 'online',
      health: 85,
      uptime: '99.2%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3335',
      tasksAutomatedDaily: 355,
      responseTime: '1.6s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Trading & Investments',
      level: 'team_lead',
      departmentId: 14,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
