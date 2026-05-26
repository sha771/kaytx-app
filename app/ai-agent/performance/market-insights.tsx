import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Target } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'market-insights',
    name: 'Customer & Market Insights AI',
    title: 'Performance & Analytics',
    description: 'Provides deep market insights, trend analysis, and competitive positioning.',
    capabilities: ["Market Insights","Trend Analysis","Competitive Positioning"],
    icon: Target,
    color: '#FF9500',
    type: 'agent' as const,
    humanCost: '$51k/year',
    aiCost: '$1k/year',
    efficiency: '51x efficiency improvement',
    replacesRole: 'Performance & Analytics',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3',
      tasksAutomatedDaily: 1465,
      responseTime: '1.5s',
      accuracyRate: '96.1%',
    },
    hierarchy: {
      department: 'Performance',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
