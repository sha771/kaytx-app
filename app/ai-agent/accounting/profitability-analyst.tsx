import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { TrendingUp } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'profitability-analyst',
    name: 'Profitability Analyst',
    title: 'Profitability Analyst',
    description: 'Analyst measuring and analyzing profitability across products, customers, segments, and business units.',
    capabilities: [
      "Profitability Analysis",
      "Product Profitability",
      "Customer Profitability",
      "Segment Analysis",
      "Margin Analysis",
      "Profitability Optimization"
    ],
    icon: TrendingUp,
    color: '#1B5E20',
    type: 'agent' as const,
    humanCost: '$75k/year',
    aiCost: '$1.2k/year',
    efficiency: '62x efficiency improvement',
    replacesRole: 'Profitability Analyst',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6.1',
      tasksAutomatedDaily: 2134,
      responseTime: '0.9s',
      accuracyRate: '98.0%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
