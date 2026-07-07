import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-product',
    uid: 'ktx-10-vp-product',
    name: 'AI VP Product',
    title: 'AI VP Product',
    description: 'AI VP Product drives department strategy and oversees operations for the Product Management department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Product Analytics', 'Market Analysis', 'Stakeholder Management', 'Product Roadmapping', 'Feature Prioritization'],
    color: '#FF5722',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$1,800/mo',
    efficiency: '86% efficiency',
    replacesRole: 'AI VP Product',
    subAgents: [
      { id: 'ai-product-roadmap-planner', uid: 'ktx-10-product-roadmap-planner', name: 'AI Product Roadmap Planner', title: 'AI Product Roadmap Planner', route: '/ai-agent/product/product-roadmap-planner' },
      { id: 'ai-sprint-planner', uid: 'ktx-10-sprint-planner', name: 'AI Sprint Planner', title: 'AI Sprint Planner', route: '/ai-agent/product/sprint-planner' },
      { id: 'ai-feedback-aggregator', uid: 'ktx-10-feedback-aggregator', name: 'AI Feedback Aggregator', title: 'AI Feedback Aggregator', route: '/ai-agent/product/feedback-aggregator' }
    ],
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$9781',
      tasksAutomatedDaily: 799,
      responseTime: '1.4s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Product Management',
      level: 'vp_director',
      departmentId: 10,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
