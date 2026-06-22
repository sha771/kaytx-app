import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'test-automation',
    name: 'AI Test Automation',
    title: 'Engineering',
    description: 'Creates and runs automated tests, identifies bugs, and ensures code quality.',
    capabilities: ["Test Automation","Bug Detection","Quality Assurance"],
    icon: Bot,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$63k/year',
    aiCost: '$1k/year',
    efficiency: '63x efficiency improvement',
    replacesRole: 'Engineering',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 1122,
      responseTime: '1.0s',
      accuracyRate: '97.2%',
    },
    hierarchy: {
      department: 'Engineering',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
