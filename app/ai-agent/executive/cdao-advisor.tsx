import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cdao-advisor',
    name: 'cdao-advisor',
    title: 'cdao-advisor',
    description: 'The cdao-advisor AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#FF9500',
    type: 'agent' as const,
    humanCost: '$81k/year',
    aiCost: '$1k/year',
    efficiency: '81x efficiency improvement',
    replacesRole: 'cdao-advisor',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 1224,
      responseTime: '1.4s',
      accuracyRate: '96.8%',
    },
    hierarchy: {
      department: 'Executive',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
