import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'strategy-planner',
    name: 'strategy-planner',
    title: 'strategy-planner',
    description: 'The strategy-planner AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#FF9500',
    type: 'agent' as const,
    humanCost: '$67k/year',
    aiCost: '$1k/year',
    efficiency: '67x efficiency improvement',
    replacesRole: 'strategy-planner',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 1275,
      responseTime: '0.4s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Executive',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
