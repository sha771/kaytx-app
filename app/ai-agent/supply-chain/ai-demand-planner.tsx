import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-demand-planner',
    name: 'ai-demand-planner',
    title: 'ai-demand-planner',
    description: 'The ai-demand-planner AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#607D8B',
    type: 'agent' as const,
    humanCost: '$55k/year',
    aiCost: '$1k/year',
    efficiency: '55x efficiency improvement',
    replacesRole: 'ai-demand-planner',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 1348,
      responseTime: '0.9s',
      accuracyRate: '98.8%',
    },
    hierarchy: {
      department: 'Supply-chain',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
