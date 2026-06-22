import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'policy-admin',
    name: 'policy-admin',
    title: 'policy-admin',
    description: 'The policy-admin AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#009688',
    type: 'agent' as const,
    humanCost: '$53k/year',
    aiCost: '$1k/year',
    efficiency: '53x efficiency improvement',
    replacesRole: 'policy-admin',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3',
      tasksAutomatedDaily: 1063,
      responseTime: '0.9s',
      accuracyRate: '98.6%',
    },
    hierarchy: {
      department: 'Insurance',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
