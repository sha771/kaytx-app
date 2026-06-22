import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-product-operations',
    uid: 'ktx-10-vp-product-operations',
    name: 'AI VP Product Operations',
    title: 'AI VP Product Operations',
    description: 'AI VP Product Operations drives department strategy and oversees operations for the Product Management department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Product Roadmapping', 'Feature Prioritization', 'User Research', 'Sprint Planning', 'A/B Testing'],
    color: '#FF5722',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$1,800/mo',
    efficiency: '83% efficiency',
    replacesRole: 'AI VP Product Operations',
    subAgents: [
      { id: 'ai-market-alignment-checker', uid: 'ktx-10-market-alignment-checker', name: 'AI Market Alignment Checker', title: 'AI Market Alignment Checker', route: '/ai-agent/product/market-alignment-checker' },
      { id: 'ai-story-writer', uid: 'ktx-10-story-writer', name: 'AI Story Writer', title: 'AI Story Writer', route: '/ai-agent/product/story-writer' },
      { id: 'ai-usability-test-designer', uid: 'ktx-10-usability-test-designer', name: 'AI Usability Test Designer', title: 'AI Usability Test Designer', route: '/ai-agent/product/usability-test-designer' }
    ],
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11288',
      tasksAutomatedDaily: 552,
      responseTime: '2.2s',
      accuracyRate: '94.0%',
    },
    hierarchy: {
      department: 'Product Management',
      level: 'vp_director',
      departmentId: 10,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
