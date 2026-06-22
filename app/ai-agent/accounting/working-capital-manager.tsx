import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Repeat } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'working-capital-manager',
    name: 'Working Capital Manager',
    title: 'Working Capital Manager',
    description: 'Manager optimizing working capital components including inventory, receivables, and payables for maximum efficiency.',
    capabilities: [
      "Working Capital Optimization",
      "Inventory Management",
      "Receivables Management",
      "Payables Optimization",
      "Cash Conversion Cycle",
      "Liquidity Planning"
    ],
    icon: Repeat,
    color: '#00838F',
    type: 'agent' as const,
    humanCost: '$90k/year',
    aiCost: '$1.5k/year',
    efficiency: '60x efficiency improvement',
    replacesRole: 'Working Capital Manager',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$7.4',
      tasksAutomatedDaily: 2543,
      responseTime: '0.7s',
      accuracyRate: '98.4%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
