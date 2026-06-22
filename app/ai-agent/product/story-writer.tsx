import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-story-writer',
    uid: 'ktx-10-story-writer',
    name: 'AI Story Writer',
    title: 'AI Story Writer',
    description: 'AI Story Writer provides specialized expertise and executes critical tasks for the Product Management department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Stakeholder Management', 'Product Roadmapping', 'Feature Prioritization', 'User Research', 'Sprint Planning'],
    color: '#FF5722',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '80% efficiency',
    replacesRole: 'AI Story Writer',
    infrastructure: {
      status: 'online',
      health: 85,
      uptime: '99.2%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3335',
      tasksAutomatedDaily: 355,
      responseTime: '1.6s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Product Management',
      level: 'specialist',
      departmentId: 10,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
