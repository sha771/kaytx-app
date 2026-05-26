import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'agent-preferences',
    name: 'agent-preferences',
    title: 'agent-preferences',
    description: 'The agent-preferences AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#3F51B5',
    type: 'agent' as const,
    humanCost: '$87k/year',
    aiCost: '$1k/year',
    efficiency: '87x efficiency improvement',
    replacesRole: 'agent-preferences',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 642,
      responseTime: '1.0s',
      accuracyRate: '95.5%',
    },
    hierarchy: {
      department: 'Options',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
