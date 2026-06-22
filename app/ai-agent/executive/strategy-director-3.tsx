import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Lightbulb } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'strategy-director-3',
    name: 'Strategy Director 3',
    title: 'Director of Innovation Strategy',
    description: 'Manages innovation strategy, R&D direction, and technology roadmap planning.',
    capabilities: ["Innovation Strategy","R&D Direction","Technology Roadmap","Innovation Pipeline","Strategic Innovation"],
    icon: Lightbulb,
    color: '#4A148C',
    type: 'agent' as const,
    humanCost: '$170k/year',
    aiCost: '$3k/year',
    efficiency: '57x efficiency improvement',
    replacesRole: 'Strategy Director',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$14k',
      tasksAutomatedDaily: 182,
      responseTime: '0.5s',
      accuracyRate: '97.2%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
