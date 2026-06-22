import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Wrench } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'prop-mgmt-director-3',
    uid: 'ktx-15-prop-mgmt-director-3',
    name: 'Property Management Director 3',
    title: 'Director of Property Maintenance',
    description: 'Director of Property Maintenance oversees property maintenance, facility services, and maintenance operations.',
    capabilities: ['Property Maintenance', 'Facility Services', 'Maintenance Operations', 'Preventive Maintenance', 'Vendor Management'],
    color: '#8D6E63',
    type: 'agent' as const,
    humanCost: '$145k/year',
    aiCost: '$2,900/mo',
    efficiency: '91% efficiency',
    replacesRole: 'Property Management Director',
    infrastructure: {
      status: 'online',
      health: 93,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11,467',
      tasksAutomatedDaily: 495,
      responseTime: '2.3s',
      accuracyRate: '94.5%',
    },
    hierarchy: {
      department: 'Real Estate & Property',
      level: 'director',
      departmentId: 15,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
