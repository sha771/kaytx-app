import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'freight-broker',
    name: 'freight-broker',
    title: 'freight-broker',
    description: 'The freight-broker AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#607D8B',
    type: 'agent' as const,
    humanCost: '$69k/year',
    aiCost: '$1k/year',
    efficiency: '69x efficiency improvement',
    replacesRole: 'freight-broker',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 996,
      responseTime: '0.8s',
      accuracyRate: '97.2%',
    },
    hierarchy: {
      department: 'Operations',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
