import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Globe } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'market-research-director-3',
    uid: 'ktx-15-market-research-director-3',
    name: 'Market Research Director 3',
    title: 'Director of Global Market Research',
    description: 'Director of Global Market Research manages global market research, international trends, and cross-market analysis.',
    capabilities: ['Global Research', 'International Trends', 'Cross-Market Analysis', 'Global Strategy', 'Market Entry'],
    color: '#8D6E63',
    type: 'agent' as const,
    humanCost: '$155k/year',
    aiCost: '$3,100/mo',
    efficiency: '93% efficiency',
    replacesRole: 'Market Research Director',
    infrastructure: {
      status: 'online',
      health: 95,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$12,267',
      tasksAutomatedDaily: 508,
      responseTime: '2.1s',
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
