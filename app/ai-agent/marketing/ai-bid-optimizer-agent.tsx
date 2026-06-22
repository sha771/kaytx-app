import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-bid-optimizer-agent',
    name: 'ai-bid-optimizer-agent',
    title: 'ai-bid-optimizer-agent',
    description: 'The ai-bid-optimizer-agent AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#9C27B0',
    type: 'agent' as const,
    humanCost: '$57k/year',
    aiCost: '$1k/year',
    efficiency: '57x efficiency improvement',
    replacesRole: 'ai-bid-optimizer-agent',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 757,
      responseTime: '1.6s',
      accuracyRate: '97.9%',
    },
    hierarchy: {
      department: 'Marketing',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
