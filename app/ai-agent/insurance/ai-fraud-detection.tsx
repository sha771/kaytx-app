import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-fraud-detection',
    name: 'ai-fraud-detection',
    title: 'ai-fraud-detection',
    description: 'The ai-fraud-detection AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#009688',
    type: 'agent' as const,
    humanCost: '$88k/year',
    aiCost: '$1k/year',
    efficiency: '88x efficiency improvement',
    replacesRole: 'ai-fraud-detection',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 1161,
      responseTime: '1.1s',
      accuracyRate: '96.4%',
    },
    hierarchy: {
      department: 'Insurance',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
