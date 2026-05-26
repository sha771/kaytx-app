import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-policy-administrator',
    name: 'ai-policy-administrator',
    title: 'ai-policy-administrator',
    description: 'The ai-policy-administrator AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#009688',
    type: 'agent' as const,
    humanCost: '$63k/year',
    aiCost: '$1k/year',
    efficiency: '63x efficiency improvement',
    replacesRole: 'ai-policy-administrator',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 1180,
      responseTime: '0.5s',
      accuracyRate: '97.9%',
    },
    hierarchy: {
      department: 'Insurance',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
