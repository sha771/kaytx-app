import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Home } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'acquisition-specialist-3',
    uid: 'ktx-15-acquisition-specialist-3',
    name: 'Acquisition Specialist 3',
    title: 'Residential Acquisition Specialist',
    description: 'Residential Acquisition Specialist manages residential property acquisitions and residential deal management.',
    capabilities: ['Residential Acquisitions', 'Residential Deals', 'Portfolio Building', 'Residential Evaluation', 'Multi-Family Strategy'],
    color: '#8D6E63',
    type: 'agent' as const,
    humanCost: '$115k/year',
    aiCost: '$2,300/mo',
    efficiency: '89% efficiency',
    replacesRole: 'Acquisition Specialist',
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
      level: 'team_lead',
      departmentId: 15,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
