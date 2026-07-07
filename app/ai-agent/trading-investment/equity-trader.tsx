import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-equity-trader',
    uid: 'ktx-14-equity-trader',
    name: 'AI Equity Trader',
    title: 'AI Equity Trader',
    description: 'AI Equity Trader coordinates team activities and ensures quality output for the Trading & Investments department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Portfolio Management', 'Market Analysis', 'Risk Assessment', 'Trade Execution', 'Compliance Monitoring'],
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '87% efficiency',
    replacesRole: 'AI Equity Trader',
    subAgents: [
      { id: 'ai-investment-committee-coordinator', uid: 'ktx-14-investment-committee-coordinator', name: 'AI Investment Committee Coordinator', title: 'AI Investment Committee Coordinator', route: '/ai-agent/trading/investment-committee-coordinator' },
      { id: 'ai-on-chain-analyzer', uid: 'ktx-14-on-chain-analyzer', name: 'AI On-chain Analyzer', title: 'AI On-chain Analyzer', route: '/ai-agent/trading/on-chain-analyzer' },
      { id: 'ai-esg-data-collector', uid: 'ktx-14-esg-data-collector', name: 'AI ESG Data Collector', title: 'AI ESG Data Collector', route: '/ai-agent/trading/esg-data-collector' }
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
      department: 'Trading & Investments',
      level: 'team_lead',
      departmentId: 14,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
