import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { HardHat } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 're-director-5',
    uid: 'ktx-15-re-director-5',
    name: 'Real Estate Director 5',
    title: 'Director of Property Development',
    description: 'Director of Property Development oversees property development, construction projects, and development strategy.',
    capabilities: ['Property Development', 'Construction Management', 'Development Strategy', 'Project Oversight', 'Quality Control'],
    color: '#8D6E63',
    type: 'agent' as const,
    humanCost: '$170k/year',
    aiCost: '$3,400/mo',
    efficiency: '93% efficiency',
    replacesRole: 'Real Estate Director',
    infrastructure: {
      status: 'online',
      health: 95,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$13,600',
      tasksAutomatedDaily: 525,
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
