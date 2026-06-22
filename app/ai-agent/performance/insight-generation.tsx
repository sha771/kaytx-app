import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Target } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'insight-generation',
    name: 'Insight Generation AI',
    title: 'Performance & Analytics',
    description: 'Automatically discovers and generates actionable business insights from data.',
    capabilities: ["Insight Discovery","Automated Analysis","Actionable Recommendations"],
    icon: Target,
    color: '#FF9500',
    type: 'agent' as const,
    humanCost: '$85k/year',
    aiCost: '$1k/year',
    efficiency: '85x efficiency improvement',
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
      tasksAutomatedDaily: 1239,
      responseTime: '0.9s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Performance',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
