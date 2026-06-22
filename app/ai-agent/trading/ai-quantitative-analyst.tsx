import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { BarChart3 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-quantitative-analyst',
    name: 'ai-quantitative-analyst',
    title: 'ai-quantitative-analyst',
    description: 'The ai-quantitative-analyst AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: BarChart3,
    color: '#FFC107',
    type: 'agent' as const,
    humanCost: '$86k/year',
    aiCost: '$1k/year',
    efficiency: '86x efficiency improvement',
    replacesRole: 'ai-quantitative-analyst',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 1086,
      responseTime: '0.9s',
      accuracyRate: '97.1%',
    },
    hierarchy: {
      department: 'Trading',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
