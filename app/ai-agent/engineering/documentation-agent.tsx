import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'documentation-agent',
    name: 'AI Documentation Agent',
    title: 'Engineering',
    description: 'Creates and maintains technical documentation, API docs, and user guides.',
    capabilities: ["Documentation Creation","API Documentation","User Guide Generation"],
    icon: Bot,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$94k/year',
    aiCost: '$1k/year',
    efficiency: '94x efficiency improvement',
    replacesRole: 'Engineering',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7',
      tasksAutomatedDaily: 1402,
      responseTime: '0.7s',
      accuracyRate: '98.6%',
    },
    hierarchy: {
      department: 'Engineering',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
