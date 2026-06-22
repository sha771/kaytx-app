import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-executive-assistant',
    name: 'ai-executive-assistant',
    title: 'ai-executive-assistant',
    description: 'The ai-executive-assistant AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#5856D6',
    type: 'agent' as const,
    humanCost: '$69k/year',
    aiCost: '$1k/year',
    efficiency: '69x efficiency improvement',
    replacesRole: 'ai-executive-assistant',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 616,
      responseTime: '1.0s',
      accuracyRate: '96.2%',
    },
    hierarchy: {
      department: 'Administrative',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
