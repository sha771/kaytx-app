import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-sre-engineer',
    name: 'ai-sre-engineer',
    title: 'ai-sre-engineer',
    description: 'The ai-sre-engineer AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#007AFF',
    type: 'agent' as const,
    humanCost: '$69k/year',
    aiCost: '$1k/year',
    efficiency: '69x efficiency improvement',
    replacesRole: 'ai-sre-engineer',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 1440,
      responseTime: '0.5s',
      accuracyRate: '96.9%',
    },
    hierarchy: {
      department: 'Tech',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
