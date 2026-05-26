import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: '[agentId]',
    name: '[agentId]',
    title: '[agentId]',
    description: '{agent.description}',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#9C27B0',
    type: 'agent' as const,
    humanCost: '$98k/year',
    aiCost: '$1k/year',
    efficiency: '98x efficiency improvement',
    replacesRole: '[agentId]',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7',
      tasksAutomatedDaily: 1139,
      responseTime: '0.7s',
      accuracyRate: '95.4%',
    },
    hierarchy: {
      department: 'Agent',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
