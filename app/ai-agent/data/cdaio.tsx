import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cdaio',
    name: 'cdaio',
    title: 'cdaio',
    description: 'The cdaio AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$81k/year',
    aiCost: '$1k/year',
    efficiency: '81x efficiency improvement',
    replacesRole: 'cdaio',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 1366,
      responseTime: '0.9s',
      accuracyRate: '95.2%',
    },
    hierarchy: {
      department: 'Data',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
