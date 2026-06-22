import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-product-marketer',
    uid: 'ktx-10-product-marketer',
    name: 'AI Product Marketer',
    title: 'AI Product Marketer',
    description: 'AI Product Marketer coordinates team activities and ensures quality output for the Product Management department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Sprint Planning', 'A/B Testing', 'Product Analytics', 'Market Analysis', 'Stakeholder Management'],
    color: '#FF5722',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '88% efficiency',
    replacesRole: 'AI Product Marketer',
    subAgents: [
      { id: 'ai-cross-functional-coordinator', uid: 'ktx-10-cross-functional-coordinator', name: 'AI Cross-functional Coordinator', title: 'AI Cross-functional Coordinator', route: '/ai-agent/product/cross-functional-coordinator' },
      { id: 'ai-market-researcher', uid: 'ktx-10-market-researcher', name: 'AI Market Researcher', title: 'AI Market Researcher', route: '/ai-agent/product/market-researcher' },
      { id: 'ai-rollback-planner', uid: 'ktx-10-rollback-planner', name: 'AI Rollback Planner', title: 'AI Rollback Planner', route: '/ai-agent/product/rollback-planner' }
    ],
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3691',
      tasksAutomatedDaily: 423,
      responseTime: '1.8s',
      accuracyRate: '98.4%',
    },
    hierarchy: {
      department: 'Product Management',
      level: 'team_lead',
      departmentId: 10,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
