import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-public-affairs',
    name: 'ai-public-affairs',
    title: 'ai-public-affairs',
    description: 'The ai-public-affairs AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#3F51B5',
    type: 'agent' as const,
    humanCost: '$68k/year',
    aiCost: '$1k/year',
    efficiency: '68x efficiency improvement',
    replacesRole: 'ai-public-affairs',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 749,
      responseTime: '1.2s',
      accuracyRate: '95.1%',
    },
    hierarchy: {
      department: 'Government',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
