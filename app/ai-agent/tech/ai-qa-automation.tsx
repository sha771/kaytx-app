import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-qa-automation',
    name: 'ai-qa-automation',
    title: 'ai-qa-automation',
    description: 'The ai-qa-automation AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#007AFF',
    type: 'agent' as const,
    humanCost: '$92k/year',
    aiCost: '$1k/year',
    efficiency: '92x efficiency improvement',
    replacesRole: 'ai-qa-automation',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 1153,
      responseTime: '0.4s',
      accuracyRate: '96.6%',
    },
    hierarchy: {
      department: 'Tech',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
