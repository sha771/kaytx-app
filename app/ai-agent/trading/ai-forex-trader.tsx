import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-forex-trader',
    name: 'ai-forex-trader',
    title: 'ai-forex-trader',
    description: 'The ai-forex-trader AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#FFC107',
    type: 'agent' as const,
    humanCost: '$88k/year',
    aiCost: '$1k/year',
    efficiency: '88x efficiency improvement',
    replacesRole: 'ai-forex-trader',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 668,
      responseTime: '0.8s',
      accuracyRate: '98.1%',
    },
    hierarchy: {
      department: 'Trading',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
