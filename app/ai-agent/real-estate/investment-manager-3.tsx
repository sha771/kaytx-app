import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Globe } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'investment-manager-3',
    uid: 'ktx-15-investment-manager-3',
    name: 'Investment Manager 3',
    title: 'International Investment Manager',
    description: 'International Investment Manager manages cross-border real estate investments, international markets, and global strategies.',
    capabilities: ['International Investments', 'Cross-Border Deals', 'Global Markets', 'Currency Management', 'International Strategy'],
    color: '#8D6E63',
    type: 'agent' as const,
    humanCost: '$170k/year',
    aiCost: '$3,400/mo',
    efficiency: '91% efficiency',
    replacesRole: 'Investment Manager',
    infrastructure: {
      status: 'online',
      health: 93,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$13,400',
      tasksAutomatedDaily: 508,
      responseTime: '2.2s',
      accuracyRate: '94.8%',
    },
    hierarchy: {
      department: 'Real Estate & Property',
      level: 'manager',
      departmentId: 15,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
