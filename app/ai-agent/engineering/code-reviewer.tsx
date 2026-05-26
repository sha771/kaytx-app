import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'code-reviewer',
    name: 'AI Code Reviewer',
    title: 'Engineering',
    description: 'Reviews code quality, identifies bugs, and provides improvement suggestions.',
    capabilities: ["Code Quality Review","Bug Identification","Improvement Suggestions"],
    icon: Bot,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$60k/year',
    aiCost: '$1k/year',
    efficiency: '60x efficiency improvement',
    replacesRole: 'Engineering',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 1135,
      responseTime: '0.5s',
      accuracyRate: '96.0%',
    },
    hierarchy: {
      department: 'Engineering',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
