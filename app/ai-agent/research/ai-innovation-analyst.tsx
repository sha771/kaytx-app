import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { BarChart3 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-innovation-analyst',
    name: 'ai-innovation-analyst',
    title: 'ai-innovation-analyst',
    description: 'The ai-innovation-analyst AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: BarChart3,
    color: '#673AB7',
    type: 'agent' as const,
    humanCost: '$87k/year',
    aiCost: '$1k/year',
    efficiency: '87x efficiency improvement',
    replacesRole: 'ai-innovation-analyst',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 681,
      responseTime: '0.9s',
      accuracyRate: '95.4%',
    },
    hierarchy: {
      department: 'Research',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
