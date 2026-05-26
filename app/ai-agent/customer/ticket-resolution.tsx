import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ticket-resolution',
    name: 'ticket-resolution',
    title: 'ticket-resolution',
    description: 'The ticket-resolution AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#2196F3',
    type: 'agent' as const,
    humanCost: '$53k/year',
    aiCost: '$1k/year',
    efficiency: '53x efficiency improvement',
    replacesRole: 'ticket-resolution',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3',
      tasksAutomatedDaily: 886,
      responseTime: '1.2s',
      accuracyRate: '98.7%',
    },
    hierarchy: {
      department: 'Customer',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
