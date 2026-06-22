import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Handshake } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'bus-dev-director-1',
    name: 'Business Development Director 1',
    title: 'Director of Strategic Partnerships',
    description: 'Leads strategic partnership development, alliance management, and partner relationship strategy.',
    capabilities: ["Strategic Partnerships","Alliance Management","Partner Relations","Partnership Strategy","Joint Ventures"],
    icon: Handshake,
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
      tasksAutomatedDaily: 192,
      responseTime: '0.5s',
      accuracyRate: '97.3%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
