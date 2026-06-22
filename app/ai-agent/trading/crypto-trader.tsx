import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-crypto-trader',
    uid: 'ktx-14-crypto-trader',
    name: 'AI Crypto Trader',
    title: 'AI Crypto Trader',
    description: 'AI Crypto Trader coordinates team activities and ensures quality output for the Trading & Investments department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Portfolio Management', 'Market Analysis', 'Risk Assessment', 'Trade Execution', 'Compliance Monitoring'],
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '87% efficiency',
    replacesRole: 'AI Crypto Trader',
    subAgents: [
      { id: 'ai-diligence-overseer', uid: 'ktx-14-diligence-overseer', name: 'AI Diligence Overseer', title: 'AI Diligence Overseer', route: '/ai-agent/trading/diligence-overseer' },
      { id: 'ai-wallet-security-checker', uid: 'ktx-14-wallet-security-checker', name: 'AI Wallet Security Checker', title: 'AI Wallet Security Checker', route: '/ai-agent/trading/wallet-security-checker' },
      { id: 'ai-impact-reporter', uid: 'ktx-14-impact-reporter', name: 'AI Impact Reporter', title: 'AI Impact Reporter', route: '/ai-agent/trading/impact-reporter' }
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
