import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cx-ticket-resolution',
    name: 'cx-ticket-resolution',
    title: 'cx-ticket-resolution',
    description: 'The cx-ticket-resolution AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#2196F3',
    type: 'agent' as const,
    humanCost: '$73k/year',
    aiCost: '$1k/year',
    efficiency: '73x efficiency improvement',
    replacesRole: 'cx-ticket-resolution',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 1484,
      responseTime: '1.6s',
      accuracyRate: '95.2%',
    },
    hierarchy: {
      department: 'Customer',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
