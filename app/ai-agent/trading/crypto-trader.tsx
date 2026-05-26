import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'crypto-trader',
    name: 'crypto-trader',
    title: 'crypto-trader',
    description: 'The crypto-trader AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#FFC107',
    type: 'agent' as const,
    humanCost: '$69k/year',
    aiCost: '$1k/year',
    efficiency: '69x efficiency improvement',
    replacesRole: 'crypto-trader',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 798,
      responseTime: '1.6s',
      accuracyRate: '95.4%',
    },
    hierarchy: {
      department: 'Trading',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
