import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'creo',
    name: 'creo',
    title: 'creo',
    description: 'The creo AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#FF9500',
    type: 'employee' as const,
    humanCost: '$180k/year',
    aiCost: '$3k/year',
    efficiency: '60x efficiency improvement',
    replacesRole: 'creo',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$13',
      tasksAutomatedDaily: 678,
      responseTime: '1.1s',
      accuracyRate: '98.6%',
    },
    hierarchy: {
      department: 'Executive',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
