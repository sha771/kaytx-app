import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { PieChart } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'asset-manager-1',
    uid: 'ktx-15-asset-manager-1',
    name: 'Asset Manager 1',
    title: 'Commercial Asset Manager',
    description: 'Commercial Asset Manager manages commercial property assets, performance optimization, and asset value enhancement.',
    capabilities: ['Asset Management', 'Performance Optimization', 'Value Enhancement', 'Financial Analysis', 'Asset Strategy'],
    color: '#8D6E63',
    type: 'agent' as const,
    humanCost: '$140k/year',
    aiCost: '$2,800/mo',
    efficiency: '91% efficiency',
    replacesRole: 'Asset Manager',
    infrastructure: {
      status: 'online',
      health: 93,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$11,067',
      tasksAutomatedDaily: 495,
      responseTime: '2.3s',
      accuracyRate: '94.5%',
    },
    hierarchy: {
      department: 'Real Estate & Property',
      level: 'manager',
      departmentId: 15,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
