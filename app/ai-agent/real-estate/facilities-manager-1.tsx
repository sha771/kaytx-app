import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Wrench } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'facilities-manager-1',
    uid: 'ktx-15-facilities-manager-1',
    name: 'Facilities Manager 1',
    title: 'Building Facilities Manager',
    description: 'Building Facilities Manager manages building facilities, building systems, and facility operations.',
    capabilities: ['Building Facilities', 'Building Systems', 'Facility Operations', 'System Maintenance', 'Building Services'],
    color: '#8D6E63',
    type: 'agent' as const,
    humanCost: '$110k/year',
    aiCost: '$2,200/mo',
    efficiency: '88% efficiency',
    replacesRole: 'Facilities Manager',
    infrastructure: {
      status: 'online',
      health: 90,
      uptime: '99.0%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$8,667',
      tasksAutomatedDaily: 458,
      responseTime: '2.7s',
      accuracyRate: '93.0%',
    },
    hierarchy: {
      department: 'Real Estate & Property',
      level: 'manager',
      departmentId: 15,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
