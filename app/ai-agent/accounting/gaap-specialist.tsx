import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { BookOpen } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'gaap-specialist',
    name: 'GAAP Specialist',
    title: 'GAAP Specialist',
    description: 'Specialist in Generally Accepted Accounting Principles, ensuring financial statements comply with US GAAP standards.',
    capabilities: [
      "GAAP Compliance Review",
      "Accounting Guidance Research",
      "Technical Accounting Support",
      "GAAP Implementation",
      "Accounting Policy Development",
      "GAAP Training"
    ],
    icon: BookOpen,
    color: '#1565C0',
    type: 'agent' as const,
    humanCost: '$90k/year',
    aiCost: '$1.5k/year',
    efficiency: '60x efficiency improvement',
    replacesRole: 'GAAP Specialist',
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
      accuracyRate: '98.5%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
