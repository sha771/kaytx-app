import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Compass } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'strategy-director-2',
    name: 'Strategy Director 2',
    title: 'Director of Business Strategy',
    description: 'Directs business strategy, growth initiatives, and market positioning strategies.',
    capabilities: ["Business Strategy","Growth Initiatives","Market Positioning","Strategic Initiatives","Business Development"],
    icon: Compass,
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
      tasksAutomatedDaily: 188,
      responseTime: '0.5s',
      accuracyRate: '97.8%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
