import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { TrendingUp } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'macro-analyst',
    name: 'macro-analyst',
    title: 'macro-analyst',
    description: 'The macro-analyst AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: TrendingUp,
    color: '#FFC107',
    type: 'agent' as const,
    humanCost: '$84k/year',
    aiCost: '$1k/year',
    efficiency: '84x efficiency improvement',
    replacesRole: 'macro-analyst',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 1446,
      responseTime: '1.2s',
      accuracyRate: '98.1%',
    },
    hierarchy: {
      department: 'Trading',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
