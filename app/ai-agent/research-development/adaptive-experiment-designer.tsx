import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Target } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'adaptive-experiment-designer',
    name: 'AI Adaptive Experiment Designer',
    title: 'Adaptive Experiment Designer',
    description: 'Adaptive experiment design and optimization with AI',
    capabilities: ["Experiment Design","Optimization","Research Planning","Scientific Method"],
    icon: Target,
    color: '#7B1FA2',
    type: 'employee' as const,
    humanCost: '$108k/year',
    aiCost: '$2.9k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'Experiment Designer',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$8.7k',
      tasksAutomatedDaily: 245,
      responseTime: '0.8s',
      accuracyRate: '96.6%',
    },
    hierarchy: {
      department: 'Research Development',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
