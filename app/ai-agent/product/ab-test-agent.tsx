import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ab-test-agent',
    name: 'ab-test-agent',
    title: 'ab-test-agent',
    description: 'The ab-test-agent AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#3F51B5',
    type: 'agent' as const,
    humanCost: '$92k/year',
    aiCost: '$1k/year',
    efficiency: '92x efficiency improvement',
    replacesRole: 'ab-test-agent',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 1370,
      responseTime: '1.7s',
      accuracyRate: '95.6%',
    },
    hierarchy: {
      department: 'Product',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
