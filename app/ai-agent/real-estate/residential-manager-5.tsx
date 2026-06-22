import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { TreePine } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'residential-manager-5',
    uid: 'ktx-15-residential-manager-5',
    name: 'Residential Real Estate Manager 5',
    title: 'Vacation Property Manager',
    description: 'Vacation Property Manager manages vacation rentals, resort properties, and short-term accommodations.',
    capabilities: ['Vacation Rentals', 'Resort Properties', 'Short-Term Rentals', 'Guest Experience', 'Seasonal Management'],
    color: '#8D6E63',
    type: 'agent' as const,
    humanCost: '$115k/year',
    aiCost: '$2,300/mo',
    efficiency: '89% efficiency',
    replacesRole: 'Residential Real Estate Manager',
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.1%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$9,067',
      tasksAutomatedDaily: 470,
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
