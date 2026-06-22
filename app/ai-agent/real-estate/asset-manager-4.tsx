import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { BarChart3 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'asset-manager-4',
    uid: 'ktx-15-asset-manager-4',
    name: 'Asset Manager 4',
    title: 'Investment Asset Manager',
    description: 'Investment Asset Manager manages investment assets, investor reporting, and investment performance optimization.',
    capabilities: ['Investment Assets', 'Investor Reporting', 'Investment Performance', 'Capital Management', 'Returns Optimization'],
    color: '#8D6E63',
    type: 'agent' as const,
    humanCost: '$150k/year',
    aiCost: '$3,000/mo',
    efficiency: '93% efficiency',
    replacesRole: 'Asset Manager',
    infrastructure: {
      status: 'online',
      health: 95,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$11,933',
      tasksAutomatedDaily: 510,
      responseTime: '2.1s',
      accuracyRate: '95.5%',
    },
    hierarchy: {
      department: 'Real Estate & Property',
      level: 'manager',
      departmentId: 15,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
