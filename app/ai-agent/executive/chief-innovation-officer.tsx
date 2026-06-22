import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'chief-innovation-officer',
    name: 'chief-innovation-officer',
    title: 'chief-innovation-officer',
    description: 'The chief-innovation-officer AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#FF9500',
    type: 'agent' as const,
    humanCost: '$80k/year',
    aiCost: '$1k/year',
    efficiency: '80x efficiency improvement',
    replacesRole: 'chief-innovation-officer',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 1445,
      responseTime: '0.9s',
      accuracyRate: '95.3%',
    },
    hierarchy: {
      department: 'Executive',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
