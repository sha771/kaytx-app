import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Waves } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cash-flow-analyst',
    name: 'Cash Flow Analyst',
    title: 'Cash Flow Analyst',
    description: 'Analyst specializing in cash flow analysis, forecasting, and providing insights to optimize working capital and liquidity.',
    capabilities: [
      "Cash Flow Analysis",
      "Working Capital Optimization",
      "Cash Flow Forecasting",
      "Liquidity Assessment",
      "Cash Flow Variance Analysis",
      "Scenario Modeling"
    ],
    icon: Waves,
    color: '#00838F',
    type: 'agent' as const,
    humanCost: '$70k/year',
    aiCost: '$1.2k/year',
    efficiency: '58x efficiency improvement',
    replacesRole: 'Cash Flow Analyst',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5.7',
      tasksAutomatedDaily: 2034,
      responseTime: '0.9s',
      accuracyRate: '97.8%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
