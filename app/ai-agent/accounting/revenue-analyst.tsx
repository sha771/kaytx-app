import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { LineChartUp } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'revenue-analyst',
    name: 'Revenue Analyst',
    title: 'Revenue Analyst',
    description: 'Analyst tracking revenue trends, analyzing revenue streams, and providing insights for revenue optimization strategies.',
    capabilities: [
      "Revenue Trend Analysis",
      "Revenue Stream Analysis",
      "Revenue Forecasting",
      "Customer Revenue Analysis",
      "Product Revenue Metrics",
      "Revenue Dashboard Creation"
    ],
    icon: LineChartUp,
    color: '#1B5E20',
    type: 'agent' as const,
    humanCost: '$70k/year',
    aiCost: '$1.2k/year',
    efficiency: '58x efficiency improvement',
    replacesRole: 'Revenue Analyst',
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
