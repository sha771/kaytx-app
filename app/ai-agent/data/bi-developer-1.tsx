import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'bi-developer-1',
    name: 'bi-developer-1',
    title: 'bi-developer-1',
    description: 'The bi-developer-1 AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$68k/year',
    aiCost: '$1k/year',
    efficiency: '68x efficiency improvement',
    replacesRole: 'bi-developer-1',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 537,
      responseTime: '0.6s',
      accuracyRate: '95.1%',
    },
    hierarchy: {
      department: 'Data',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
