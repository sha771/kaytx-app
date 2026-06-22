import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'bug-triager',
    name: 'AI Bug Triager',
    title: 'Engineering',
    description: 'Triages bugs, prioritizes fixes, and tracks bug resolution progress.',
    capabilities: ["Bug Triage","Fix Prioritization","Resolution Tracking"],
    icon: Bot,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$77k/year',
    aiCost: '$1k/year',
    efficiency: '77x efficiency improvement',
    replacesRole: 'Engineering',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 1180,
      responseTime: '0.6s',
      accuracyRate: '96.3%',
    },
    hierarchy: {
      department: 'Engineering',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
