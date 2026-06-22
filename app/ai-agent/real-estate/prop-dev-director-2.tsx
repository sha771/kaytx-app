import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Home } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'prop-dev-director-2',
    uid: 'ktx-15-prop-dev-director-2',
    name: 'Property Development Director 2',
    title: 'Director of Residential Development',
    description: 'Director of Residential Development manages residential property development, housing projects, and community planning.',
    capabilities: ['Residential Development', 'Housing Projects', 'Community Planning', 'Residential Construction', 'Market Analysis'],
    color: '#8D6E63',
    type: 'agent' as const,
    humanCost: '$165k/year',
    aiCost: '$3,300/mo',
    efficiency: '91% efficiency',
    replacesRole: 'Property Development Director',
    infrastructure: {
      status: 'online',
      health: 93,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$12,933',
      tasksAutomatedDaily: 512,
      responseTime: '2.2s',
      accuracyRate: '94.8%',
    },
    hierarchy: {
      department: 'Real Estate & Property',
      level: 'director',
      departmentId: 15,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
