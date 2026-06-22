import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Target } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'performance-monitoring',
    name: 'Performance Monitoring AI',
    title: 'Performance & Analytics',
    description: 'Monitors system and business performance in real-time with alerts and dashboards.',
    capabilities: ["Real-time Monitoring","Alert Management","Dashboard Analytics"],
    icon: Target,
    color: '#FF9500',
    type: 'agent' as const,
    humanCost: '$92k/year',
    aiCost: '$1k/year',
    efficiency: '92x efficiency improvement',
    replacesRole: 'Performance & Analytics',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 1146,
      responseTime: '0.9s',
      accuracyRate: '98.1%',
    },
    hierarchy: {
      department: 'Performance',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
