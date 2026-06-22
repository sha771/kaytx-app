import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { HardHat } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'prop-dev-director-1',
    uid: 'ktx-15-prop-dev-director-1',
    name: 'Property Development Director 1',
    title: 'Director of Commercial Development',
    description: 'Director of Commercial Development oversees commercial property development projects from conception to completion.',
    capabilities: ['Commercial Development', 'Project Management', 'Construction Oversight', 'Development Strategy', 'Budget Management'],
    color: '#8D6E63',
    type: 'agent' as const,
    humanCost: '$165k/year',
    aiCost: '$3,300/mo',
    efficiency: '92% efficiency',
    replacesRole: 'Property Development Director',
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$13,200',
      tasksAutomatedDaily: 518,
      responseTime: '2.1s',
      accuracyRate: '95.2%',
    },
    hierarchy: {
      department: 'Real Estate & Property',
      level: 'director',
      departmentId: 15,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
