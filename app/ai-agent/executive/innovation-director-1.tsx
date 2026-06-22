import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Lightbulb } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'innovation-director-1',
    name: 'Innovation Director 1',
    title: 'Director of Product Innovation',
    description: 'Leads product innovation strategy, new product development, and product roadmap innovation.',
    capabilities: ["Product Innovation","New Product Development","Product Roadmap","Innovation Management","Product Strategy"],
    icon: Lightbulb,
    color: '#4A148C',
    type: 'agent' as const,
    humanCost: '$175k/year',
    aiCost: '$3.5k/year',
    efficiency: '50x efficiency improvement',
    replacesRole: 'Innovation Director',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$14k',
      tasksAutomatedDaily: 188,
      responseTime: '0.5s',
      accuracyRate: '97.4%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
