import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { DollarSign } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'revenue-recognition-specialist',
    name: 'Revenue Recognition Specialist',
    title: 'Revenue Recognition Specialist',
    description: 'Specialist in revenue recognition under ASC 606, ensuring compliance with complex revenue accounting standards.',
    capabilities: [
      "ASC 606 Compliance",
      "Revenue Recognition Analysis",
      "Contract Review",
      "Performance Obligation Assessment",
      "Revenue Reporting",
      "Revenue Audit Support"
    ],
    icon: DollarSign,
    color: '#2E7D32',
    type: 'agent' as const,
    humanCost: '$90k/year',
    aiCost: '$1.5k/year',
    efficiency: '60x efficiency improvement',
    replacesRole: 'Revenue Recognition Specialist',
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
      accuracyRate: '98.6%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
