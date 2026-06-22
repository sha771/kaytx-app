import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'deals',
    name: 'deals',
    title: 'deals',
    description: 'The deals AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#007AFF',
    type: 'agent' as const,
    humanCost: '$53k/year',
    aiCost: '$1k/year',
    efficiency: '53x efficiency improvement',
    replacesRole: 'deals',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3',
      tasksAutomatedDaily: 948,
      responseTime: '1.1s',
      accuracyRate: '96.8%',
    },
    hierarchy: {
      department: 'Social-crm',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
