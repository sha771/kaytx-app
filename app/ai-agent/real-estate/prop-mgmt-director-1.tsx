import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Building2 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'prop-mgmt-director-1',
    uid: 'ktx-15-prop-mgmt-director-1',
    name: 'Property Management Director 1',
    title: 'Director of Property Management',
    description: 'Director of Property Management oversees all property management operations, property services, and management strategy.',
    capabilities: ['Property Management', 'Property Services', 'Management Strategy', 'Operations Oversight', 'Team Leadership'],
    color: '#8D6E63',
    type: 'agent' as const,
    humanCost: '$155k/year',
    aiCost: '$3,100/mo',
    efficiency: '92% efficiency',
    replacesRole: 'Property Management Director',
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$12,200',
      tasksAutomatedDaily: 505,
      responseTime: '2.2s',
      accuracyRate: '95.0%',
    },
    hierarchy: {
      department: 'Real Estate & Property',
      level: 'director',
      departmentId: 15,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
