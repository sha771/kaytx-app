import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { TrendingUp } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'senior-financial-analyst-4',
    name: 'Senior Financial Analyst IV',
    title: 'Senior Financial Analyst IV',
    description: 'Specialized financial analyst focusing on international markets, foreign exchange risk management, and global treasury operations.',
    capabilities: [
      "FX Risk Management",
      "International Financial Reporting",
      "Cross-Border Tax Planning",
      "Global Treasury Operations",
      "Currency Hedging Strategies",
      "International Compliance"
    ],
    icon: TrendingUp,
    color: '#388E3C',
    type: 'agent' as const,
    humanCost: '$115k/year',
    aiCost: '$1.9k/year',
    efficiency: '60x efficiency improvement',
    replacesRole: 'Senior Financial Analyst IV',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$9.4',
      tasksAutomatedDaily: 2980,
      responseTime: '0.7s',
      accuracyRate: '98.8%',
    },
    hierarchy: {
      department: 'Accounting',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
