import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Rocket } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'bus-dev-director-2',
    name: 'Business Development Director 2',
    title: 'Director of New Markets',
    description: 'Directs new market entry strategies, market development, and geographic expansion.',
    capabilities: ["New Market Entry","Market Development","Geographic Expansion","Market Research","Growth Strategy"],
    icon: Rocket,
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
      tasksAutomatedDaily: 195,
      responseTime: '0.5s',
      accuracyRate: '97.6%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
