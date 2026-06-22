import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Leaf } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'prop-dev-director-4',
    uid: 'ktx-15-prop-dev-director-4',
    name: 'Property Development Director 4',
    title: 'Director of Sustainable Development',
    description: 'Director of Sustainable Development oversees green building projects, sustainable development, and eco-friendly construction.',
    capabilities: ['Sustainable Development', 'Green Building', 'Eco-Friendly Construction', 'LEED Certification', 'Energy Efficiency'],
    color: '#8D6E63',
    type: 'agent' as const,
    humanCost: '$170k/year',
    aiCost: '$3,400/mo',
    efficiency: '93% efficiency',
    replacesRole: 'Property Development Director',
    infrastructure: {
      status: 'online',
      health: 95,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$13,467',
      tasksAutomatedDaily: 522,
      responseTime: '2.0s',
      accuracyRate: '95.5%',
    },
    hierarchy: {
      department: 'Real Estate & Property',
      level: 'director',
      departmentId: 15,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
