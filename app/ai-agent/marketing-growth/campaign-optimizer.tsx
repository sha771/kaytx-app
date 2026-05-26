import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'campaign-optimizer',
    name: 'campaign-optimizer',
    title: 'campaign-optimizer',
    description: 'The campaign-optimizer AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#9C27B0',
    type: 'agent' as const,
    humanCost: '$69k/year',
    aiCost: '$1k/year',
    efficiency: '69x efficiency improvement',
    replacesRole: 'campaign-optimizer',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 1220,
      responseTime: '1.1s',
      accuracyRate: '97.8%',
    },
    hierarchy: {
      department: 'Marketing-growth',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
