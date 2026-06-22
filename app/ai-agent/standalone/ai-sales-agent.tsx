import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-sales-agent',
    name: '{AGENT_NAME}',
    title: '{AGENT_NAME}',
    description: 'The {AGENT_NAME} AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#007AFF',
    type: 'agent' as const,
    humanCost: '$90k/year',
    aiCost: '$1k/year',
    efficiency: '90x efficiency improvement',
    replacesRole: '{AGENT_NAME}',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 1359,
      responseTime: '1.2s',
      accuracyRate: '97.4%',
    },
    hierarchy: {
      department: 'Standalone',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
