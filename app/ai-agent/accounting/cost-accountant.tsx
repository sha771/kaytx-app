import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Scale } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cost-accountant',
    name: 'Cost Accountant',
    title: 'Cost Accountant',
    description: 'Specialist analyzing production costs, overhead allocation, and cost structures to support pricing decisions and profitability analysis.',
    capabilities: [
      "Cost Analysis & Allocation",
      "Product Costing",
      "Overhead Distribution",
      "Standard Costing",
      "Variance Analysis",
      "Cost Optimization Recommendations"
    ],
    icon: Scale,
    color: '#F57C00',
    type: 'agent' as const,
    humanCost: '$70k/year',
    aiCost: '$1.2k/year',
    efficiency: '58x efficiency improvement',
    replacesRole: 'Cost Accountant',
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
