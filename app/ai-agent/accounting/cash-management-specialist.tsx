import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Banknote } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cash-management-specialist',
    name: 'Cash Management Specialist',
    title: 'Cash Management Specialist',
    description: 'Specialist managing daily cash positions, bank relationships, and optimizing cash flow through effective cash management strategies.',
    capabilities: [
      "Daily Cash Position Management",
      "Bank Relationship Management",
      "Cash Flow Optimization",
      "Liquidity Planning",
      "Bank Reconciliation",
      "Cash Forecasting Support"
    ],
    icon: Banknote,
    color: '#00695C',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1.2k/year',
    efficiency: '54x efficiency improvement',
    replacesRole: 'Cash Management Specialist',
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
