import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Target } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'goal-tracking',
    name: 'Goal & OKR Tracking AI',
    title: 'Performance & Analytics',
    description: 'Tracks goals, OKRs, KPIs, and provides progress reporting and recommendations.',
    capabilities: ["Goal Tracking","OKR Management","Progress Reporting"],
    icon: Target,
    color: '#FF9500',
    type: 'agent' as const,
    humanCost: '$87k/year',
    aiCost: '$1k/year',
    efficiency: '87x efficiency improvement',
    replacesRole: 'Performance & Analytics',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 1426,
      responseTime: '1.1s',
      accuracyRate: '96.3%',
    },
    hierarchy: {
      department: 'Performance',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
