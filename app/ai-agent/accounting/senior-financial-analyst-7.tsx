import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { TrendingUp } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'senior-financial-analyst-7',
    name: 'Senior Financial Analyst VII',
    title: 'Senior Financial Analyst VII',
    description: 'Senior analyst specializing in cost analysis, margin optimization, and profitability analytics across product lines and business units.',
    capabilities: [
      "Product Margin Analysis",
      "Cost Structure Optimization",
      "Profitability Analytics",
      "Transfer Pricing",
      "Make vs Buy Analysis",
      "Cost Reduction Strategy"
    ],
    icon: TrendingUp,
    color: '#66BB6A',
    type: 'agent' as const,
    humanCost: '$112k/year',
    aiCost: '$1.8k/year',
    efficiency: '62x efficiency improvement',
    replacesRole: 'Senior Financial Analyst VII',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$9.2',
      tasksAutomatedDaily: 2880,
      responseTime: '0.7s',
      accuracyRate: '98.7%',
    },
    hierarchy: {
      department: 'Accounting',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
