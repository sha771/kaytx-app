import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { TrendingUp } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'senior-financial-analyst-5',
    name: 'Senior Financial Analyst V',
    title: 'Senior Financial Analyst V',
    description: 'Senior financial analyst specializing in revenue operations, pricing strategy, and customer financial analytics for SaaS and subscription models.',
    capabilities: [
      "Revenue Operations Analytics",
      "Pricing Strategy Optimization",
      "Customer Lifetime Value Analysis",
      "Subscription Metrics",
      "Churn Prediction",
      "Revenue Recognition"
    ],
    icon: TrendingUp,
    color: '#43A047',
    type: 'agent' as const,
    humanCost: '$110k/year',
    aiCost: '$1.7k/year',
    efficiency: '64x efficiency improvement',
    replacesRole: 'Senior Financial Analyst V',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$9.0',
      tasksAutomatedDaily: 2850,
      responseTime: '0.7s',
      accuracyRate: '98.6%',
    },
    hierarchy: {
      department: 'Accounting',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
