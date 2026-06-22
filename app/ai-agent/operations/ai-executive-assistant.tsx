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
    color: '#607D8B',
    type: 'agent' as const,
    humanCost: '$95k/year',
    aiCost: '$1k/year',
    efficiency: '95x efficiency improvement',
    replacesRole: 'ai-executive-assistant',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7',
      tasksAutomatedDaily: 1280,
      responseTime: '1.3s',
      accuracyRate: '97.3%',
    },
    hierarchy: {
      department: 'Operations',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
