import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Hotel } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'commercial-manager-4',
    uid: 'ktx-15-commercial-manager-4',
    name: 'Commercial Real Estate Manager 4',
    title: 'Hospitality Property Manager',
    description: 'Hospitality Property Manager oversees hotels, resorts, and hospitality property operations.',
    capabilities: ['Hospitality Management', 'Hotel Operations', 'Guest Services', 'Revenue Management', 'Hospitality Standards'],
    color: '#8D6E63',
    type: 'agent' as const,
    humanCost: '$125k/year',
    aiCost: '$2,500/mo',
    efficiency: '89% efficiency',
    replacesRole: 'Commercial Real Estate Manager',
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.1%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$9,833',
      tasksAutomatedDaily: 478,
      responseTime: '2.6s',
      accuracyRate: '93.8%',
    },
    hierarchy: {
      department: 'Real Estate & Property',
      level: 'manager',
      departmentId: 15,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
