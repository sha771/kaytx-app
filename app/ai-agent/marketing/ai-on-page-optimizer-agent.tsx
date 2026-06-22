import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-on-page-optimizer-agent',
    name: 'ai-on-page-optimizer-agent',
    title: 'ai-on-page-optimizer-agent',
    description: 'The ai-on-page-optimizer-agent AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#9C27B0',
    type: 'agent' as const,
    humanCost: '$69k/year',
    aiCost: '$1k/year',
    efficiency: '69x efficiency improvement',
    replacesRole: 'ai-on-page-optimizer-agent',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 765,
      responseTime: '1.7s',
      accuracyRate: '98.2%',
    },
    hierarchy: {
      department: 'Marketing',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
