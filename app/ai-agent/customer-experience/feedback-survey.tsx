import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'feedback-survey',
    name: '{AGENT_NAME}',
    title: '{AGENT_NAME}',
    description: 'The {AGENT_NAME} AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#2196F3',
    type: 'agent' as const,
    humanCost: '$96k/year',
    aiCost: '$1k/year',
    efficiency: '96x efficiency improvement',
    replacesRole: '{AGENT_NAME}',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7',
      tasksAutomatedDaily: 1416,
      responseTime: '1.5s',
      accuracyRate: '97.2%',
    },
    hierarchy: {
      department: 'Customer-experience',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
