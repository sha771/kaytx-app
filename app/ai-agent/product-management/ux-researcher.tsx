import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-ux-researcher',
    uid: 'ktx-10-ux-researcher',
    name: 'AI UX Researcher',
    title: 'AI UX Researcher',
    description: 'AI UX Researcher coordinates team activities and ensures quality output for the Product Management department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Product Roadmapping', 'Feature Prioritization', 'User Research', 'Sprint Planning', 'A/B Testing'],
    color: '#FF5722',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '87% efficiency',
    replacesRole: 'AI UX Researcher',
    subAgents: [
      { id: 'ai-metric-tracker', uid: 'ktx-10-metric-tracker', name: 'AI Metric Tracker', title: 'AI Metric Tracker', route: '/ai-agent/product/metric-tracker' },
      { id: 'ai-priority-adjuster', uid: 'ktx-10-priority-adjuster', name: 'AI Priority Adjuster', title: 'AI Priority Adjuster', route: '/ai-agent/product/priority-adjuster' },
      { id: 'ai-release-coordinator', uid: 'ktx-10-release-coordinator', name: 'AI Release Coordinator', title: 'AI Release Coordinator', route: '/ai-agent/product/release-coordinator' }
    ],
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3424',
      tasksAutomatedDaily: 372,
      responseTime: '1.6s',
      accuracyRate: '97.7%',
    },
    hierarchy: {
      department: 'Product Management',
      level: 'team_lead',
      departmentId: 10,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
