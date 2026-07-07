import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-product-analyst',
    uid: 'ktx-10-product-analyst',
    name: 'AI Product Analyst',
    title: 'AI Product Analyst',
    description: 'AI Product Analyst coordinates team activities and ensures quality output for the Product Management department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['User Research', 'Sprint Planning', 'A/B Testing', 'Product Analytics', 'Market Analysis'],
    color: '#FF5722',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '81% efficiency',
    replacesRole: 'AI Product Analyst',
    subAgents: [
      { id: 'ai-process-standardizer', uid: 'ktx-10-process-standardizer', name: 'AI Process Standardizer', title: 'AI Process Standardizer', route: '/ai-agent/product/process-standardizer' },
      { id: 'ai-user-story-mapper', uid: 'ktx-10-user-story-mapper', name: 'AI User Story Mapper', title: 'AI User Story Mapper', route: '/ai-agent/product/user-story-mapper' },
      { id: 'ai-competitive-differentiator', uid: 'ktx-10-competitive-differentiator', name: 'AI Competitive Differentiator', title: 'AI Competitive Differentiator', route: '/ai-agent/product/competitive-differentiator' }
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
      level: 'team_lead',
      departmentId: 10,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
