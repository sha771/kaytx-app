import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-route-optimizer',
    name: 'ai-route-optimizer',
    title: 'ai-route-optimizer',
    description: 'The ai-route-optimizer AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#007AFF',
    type: 'agent' as const,
    humanCost: '$94k/year',
    aiCost: '$1k/year',
    efficiency: '94x efficiency improvement',
    replacesRole: 'ai-route-optimizer',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7',
      tasksAutomatedDaily: 1008,
      responseTime: '1.2s',
      accuracyRate: '97.6%',
    },
    hierarchy: {
      department: 'Transportation',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
