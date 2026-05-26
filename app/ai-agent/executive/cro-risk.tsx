import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { TrendingUp } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cro-risk',
    name: 'cro-risk',
    title: 'cro-risk',
    description: 'The cro-risk AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: TrendingUp,
    color: '#FF9500',
    type: 'agent' as const,
    humanCost: '$51k/year',
    aiCost: '$1k/year',
    efficiency: '51x efficiency improvement',
    replacesRole: 'cro-risk',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3',
      tasksAutomatedDaily: 1388,
      responseTime: '1.2s',
      accuracyRate: '97.4%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
