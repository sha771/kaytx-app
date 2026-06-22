import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Network } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'bus-dev-director-4',
    name: 'Business Development Director 4',
    title: 'Director of Channel Development',
    description: 'Directs channel strategy, distribution network development, and channel partner management.',
    capabilities: ["Channel Strategy","Distribution Networks","Channel Partners","Channel Development","Sales Channels"],
    icon: Network,
    color: '#4A148C',
    type: 'agent' as const,
    humanCost: '$165k/year',
    aiCost: '$3k/year',
    efficiency: '55x efficiency improvement',
    replacesRole: 'Business Development Director',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$13k',
      tasksAutomatedDaily: 190,
      responseTime: '0.5s',
      accuracyRate: '97.1%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
