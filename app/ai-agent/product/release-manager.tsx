import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-release-manager',
    uid: 'ktx-10-release-manager',
    name: 'AI Release Manager',
    title: 'AI Release Manager',
    description: 'AI Release Manager manages team operations and ensures delivery excellence for the Product Management department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['User Research', 'Sprint Planning', 'A/B Testing', 'Product Analytics', 'Market Analysis'],
    color: '#FF5722',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '81% efficiency',
    replacesRole: 'AI Release Manager',
    subAgents: [
      { id: 'ai-backlog-groomer', uid: 'ktx-10-backlog-groomer', name: 'AI Backlog Groomer', title: 'AI Backlog Groomer', route: '/ai-agent/product/backlog-groomer' },
      { id: 'ai-feature-usage-tracker', uid: 'ktx-10-feature-usage-tracker', name: 'AI Feature Usage Tracker', title: 'AI Feature Usage Tracker', route: '/ai-agent/product/feature-usage-tracker' },
      { id: 'ai-change-communicator', uid: 'ktx-10-change-communicator', name: 'AI Change Communicator', title: 'AI Change Communicator', route: '/ai-agent/product/change-communicator' }
    ],
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3602',
      tasksAutomatedDaily: 406,
      responseTime: '1.8s',
      accuracyRate: '98.1%',
    },
    hierarchy: {
      department: 'Product Management',
      level: 'manager',
      departmentId: 10,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
