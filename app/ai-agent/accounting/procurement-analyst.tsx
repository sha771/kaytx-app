import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { ShoppingCart } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'procurement-analyst',
    name: 'Procurement Analyst',
    title: 'Procurement Analyst',
    description: 'Analyst supporting procurement finance, spend analysis, and supplier financial assessment.',
    capabilities: [
      "Spend Analysis",
      "Supplier Financial Assessment",
      "Procurement Cost Analysis",
      "Contract Financial Review",
      "Sourcing Support",
      "Savings Tracking"
    ],
    icon: ShoppingCart,
    color: '#00695C',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1.2k/year',
    efficiency: '54x efficiency improvement',
    replacesRole: 'Procurement Analyst',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5.3',
      tasksAutomatedDaily: 1987,
      responseTime: '0.9s',
      accuracyRate: '97.9%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
