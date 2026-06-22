import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Target } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'customer-behavior-analysis',
    name: 'Customer Behavior Analysis AI',
    title: 'Performance & Analytics',
    description: 'Analyzes customer behavior patterns, journey mapping, and engagement optimization.',
    capabilities: ["Behavior Analysis","Journey Mapping","Engagement Optimization"],
    icon: Target,
    color: '#FF9500',
    type: 'agent' as const,
    humanCost: '$62k/year',
    aiCost: '$1k/year',
    efficiency: '62x efficiency improvement',
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
      tasksAutomatedDaily: 1120,
      responseTime: '0.9s',
      accuracyRate: '97.8%',
    },
    hierarchy: {
      department: 'Performance',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
