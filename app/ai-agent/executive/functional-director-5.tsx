import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Megaphone } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'functional-director-5',
    name: 'Functional Director 5',
    title: 'Director of Marketing',
    description: 'Directs marketing functions, brand management, and market development initiatives.',
    capabilities: ["Marketing Direction","Brand Management","Market Development","Campaign Strategy","Customer Acquisition"],
    icon: Megaphone,
    color: '#4A148C',
    type: 'agent' as const,
    humanCost: '$150k/year',
    aiCost: '$3k/year',
    efficiency: '50x efficiency improvement',
    replacesRole: 'Functional Director',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$12k',
      tasksAutomatedDaily: 188,
      responseTime: '0.5s',
      accuracyRate: '97.2%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
