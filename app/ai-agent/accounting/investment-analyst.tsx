import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { PiggyBank } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'investment-analyst',
    name: 'Investment Analyst',
    title: 'Investment Analyst',
    description: 'Analyst evaluating investment opportunities, managing corporate investment portfolios, and providing investment recommendations.',
    capabilities: [
      "Investment Analysis",
      "Portfolio Management",
      "Risk Assessment",
      "Market Research",
      "Investment Recommendation Generation",
      "Performance Tracking"
    ],
    icon: PiggyBank,
    color: '#2E7D32',
    type: 'agent' as const,
    humanCost: '$85k/year',
    aiCost: '$1.5k/year',
    efficiency: '56x efficiency improvement',
    replacesRole: 'Investment Analyst',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$6.9',
      tasksAutomatedDaily: 2345,
      responseTime: '0.8s',
      accuracyRate: '98.1%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
