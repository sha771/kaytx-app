import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cpu } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cco',
    name: '{agent.name}',
    title: '{agent.title}',
    description: 'AI Chief Customer Officer - CCO level AI agent in the cco department. Part of the Kaytx AI Workforce hierarchy providing automated cco capabilities.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Cpu,
    color: '#2196F3',
    type: 'agent' as const,
    humanCost: '$78k/year',
    aiCost: '$1k/year',
    efficiency: '78x efficiency improvement',
    replacesRole: '{agent.title}',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 769,
      responseTime: '0.9s',
      accuracyRate: '97.9%',
    },
    hierarchy: {
      department: 'Customer-experience',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
