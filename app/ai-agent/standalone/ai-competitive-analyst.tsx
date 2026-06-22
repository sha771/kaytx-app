import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-competitive-analyst',
    name: '{AGENT_NAME}',
    title: '{AGENT_NAME}',
    description: 'The {AGENT_NAME} AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#007AFF',
    type: 'agent' as const,
    humanCost: '$60k/year',
    aiCost: '$1k/year',
    efficiency: '60x efficiency improvement',
    replacesRole: '{AGENT_NAME}',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 712,
      responseTime: '0.8s',
      accuracyRate: '98.8%',
    },
    hierarchy: {
      department: 'Standalone',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
