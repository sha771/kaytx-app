import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'meeting-rooms',
    name: 'meeting-rooms',
    title: 'meeting-rooms',
    description: 'The meeting-rooms AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#2196F3',
    type: 'agent' as const,
    humanCost: '$95k/year',
    aiCost: '$1k/year',
    efficiency: '95x efficiency improvement',
    replacesRole: 'meeting-rooms',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7',
      tasksAutomatedDaily: 550,
      responseTime: '1.1s',
      accuracyRate: '95.2%',
    },
    hierarchy: {
      department: 'Collaboration',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
