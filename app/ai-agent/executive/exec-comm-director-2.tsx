import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Radio } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'exec-comm-director-2',
    name: 'Executive Communication Director 2',
    title: 'Director of External Communications',
    description: 'Directs external communications, public relations, and media relations strategies.',
    capabilities: ["External Communications","Public Relations","Media Relations","Brand Messaging","Crisis Communication"],
    icon: Radio,
    color: '#4A148C',
    type: 'agent' as const,
    humanCost: '$160k/year',
    aiCost: '$3k/year',
    efficiency: '53x efficiency improvement',
    replacesRole: 'Executive Communication Director',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$13k',
      tasksAutomatedDaily: 178,
      responseTime: '0.5s',
      accuracyRate: '96.5%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
