import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-skill-gap-analyzer',
    name: 'ai-skill-gap-analyzer',
    title: 'ai-skill-gap-analyzer',
    description: 'The ai-skill-gap-analyzer AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#E91E63',
    type: 'agent' as const,
    humanCost: '$84k/year',
    aiCost: '$1k/year',
    efficiency: '84x efficiency improvement',
    replacesRole: 'ai-skill-gap-analyzer',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 1081,
      responseTime: '0.6s',
      accuracyRate: '98.6%',
    },
    hierarchy: {
      department: 'Hr',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
