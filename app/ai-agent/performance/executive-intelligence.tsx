import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Target } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'executive-intelligence',
    name: 'Executive Intelligence AI',
    title: 'Performance & Analytics',
    description: 'Provides executive-level intelligence, strategic insights, and board-ready reports.',
    capabilities: ["Executive Intelligence","Strategic Insights","Board Reporting"],
    icon: Target,
    color: '#FF9500',
    type: 'agent' as const,
    humanCost: '$63k/year',
    aiCost: '$1k/year',
    efficiency: '63x efficiency improvement',
    replacesRole: 'Performance & Analytics',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 888,
      responseTime: '1.0s',
      accuracyRate: '98.0%',
    },
    hierarchy: {
      department: 'Performance',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
