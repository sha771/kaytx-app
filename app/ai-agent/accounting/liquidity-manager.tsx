import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Droplet } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'liquidity-manager',
    name: 'Liquidity Manager',
    title: 'Liquidity Manager',
    description: 'Manager overseeing liquidity management, ensuring adequate cash reserves, and optimizing short-term investment strategies.',
    capabilities: [
      "Liquidity Risk Management",
      "Cash Reserve Optimization",
      "Short-Term Investment Management",
      "Liquidity Stress Testing",
      "Credit Line Management",
      "Liquidity Policy Development"
    ],
    icon: Droplet,
    color: '#0288D1',
    type: 'agent' as const,
    humanCost: '$85k/year',
    aiCost: '$1.5k/year',
    efficiency: '56x efficiency improvement',
    replacesRole: 'Liquidity Manager',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$6.9',
      tasksAutomatedDaily: 2345,
      responseTime: '0.8s',
      accuracyRate: '98.1%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
