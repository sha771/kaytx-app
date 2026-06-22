import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { ShieldAlert } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'hedging-specialist',
    name: 'Hedging Specialist',
    title: 'Hedging Specialist',
    description: 'Specialist managing financial hedging strategies to mitigate currency, commodity, and interest rate risks.',
    capabilities: [
      "Hedging Strategy Development",
      "Currency Risk Management",
      "Commodity Hedging",
      "Interest Rate Hedging",
      "Hedging Effectiveness Analysis",
      "Derivative Management"
    ],
    icon: ShieldAlert,
    color: '#4527A0',
    type: 'agent' as const,
    humanCost: '$95k/year',
    aiCost: '$1.5k/year',
    efficiency: '63x efficiency improvement',
    replacesRole: 'Hedging Specialist',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$7.8',
      tasksAutomatedDaily: 2456,
      responseTime: '0.8s',
      accuracyRate: '98.5%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
