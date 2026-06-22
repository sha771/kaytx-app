import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'system-settings',
    name: 'system-settings',
    title: 'system-settings',
    description: 'The system-settings AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#5856D6',
    type: 'agent' as const,
    humanCost: '$84k/year',
    aiCost: '$1k/year',
    efficiency: '84x efficiency improvement',
    replacesRole: 'system-settings',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 811,
      responseTime: '1.1s',
      accuracyRate: '97.8%',
    },
    hierarchy: {
      department: 'Admin',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
