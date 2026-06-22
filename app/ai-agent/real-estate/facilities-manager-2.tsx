import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Zap } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'facilities-manager-2',
    uid: 'ktx-15-facilities-manager-2',
    name: 'Facilities Manager 2',
    title: 'Energy Management Manager',
    description: 'Energy Management Manager manages energy systems, energy efficiency, and utility optimization.',
    capabilities: ['Energy Management', 'Energy Efficiency', 'Utility Optimization', 'Sustainability', 'Cost Reduction'],
    color: '#8D6E63',
    type: 'agent' as const,
    humanCost: '$115k/year',
    aiCost: '$2,300/mo',
    efficiency: '89% efficiency',
    replacesRole: 'Facilities Manager',
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.1%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$9,000',
      tasksAutomatedDaily: 465,
      responseTime: '2.6s',
      accuracyRate: '93.5%',
    },
    hierarchy: {
      department: 'Real Estate & Property',
      level: 'manager',
      departmentId: 15,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
