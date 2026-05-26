import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-qa-automation-engineer',
    name: 'AI QA Automation Engineer',
    title: 'Engineering',
    description: 'The AI QA Automation Engineer builds and maintains comprehensive test automation frameworks, ensuring software quality through E2E, performance, and integration testing.',
    capabilities: ["Test Automation","E2E Testing","Performance Testing","CI/CD Integration","Flaky Test Management","Test Reporting"],
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
      tasksAutomatedDaily: 1408,
      responseTime: '0.4s',
      accuracyRate: '95.8%',
    },
    hierarchy: {
      department: 'Engineering',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
