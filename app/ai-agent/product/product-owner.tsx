import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-product-owner',
    uid: 'ktx-10-product-owner',
    name: 'AI Product Owner',
    title: 'AI Product Owner',
    description: 'AI Product Owner coordinates team activities and ensures quality output for the Product Management department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Product Roadmapping', 'Feature Prioritization', 'User Research', 'Sprint Planning', 'A/B Testing'],
    color: '#FF5722',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '87% efficiency',
    replacesRole: 'AI Product Owner',
    subAgents: [
      { id: 'ai-strategic-opportunity-scout', uid: 'ktx-10-strategic-opportunity-scout', name: 'AI Strategic Opportunity Scout', title: 'AI Strategic Opportunity Scout', route: '/ai-agent/product/strategic-opportunity-scout' },
      { id: 'ai-sprint-reviewer', uid: 'ktx-10-sprint-reviewer', name: 'AI Sprint Reviewer', title: 'AI Sprint Reviewer', route: '/ai-agent/product/sprint-reviewer' },
      { id: 'ai-launch-planner', uid: 'ktx-10-launch-planner', name: 'AI Launch Planner', title: 'AI Launch Planner', route: '/ai-agent/product/launch-planner' }
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
