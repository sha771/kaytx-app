import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-product-manager',
    uid: 'ktx-10-product-manager',
    name: 'AI Product Manager',
    title: 'AI Product Manager',
    description: 'AI Product Manager manages team operations and ensures delivery excellence for the Product Management department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['User Research', 'Sprint Planning', 'A/B Testing', 'Product Analytics', 'Market Analysis'],
    color: '#FF5722',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '81% efficiency',
    replacesRole: 'AI Product Manager',
    subAgents: [
      { id: 'ai-competitive-analyst', uid: 'ktx-10-competitive-analyst', name: 'AI Competitive Analyst', title: 'AI Competitive Analyst', route: '/ai-agent/product/competitive-analyst' },
      { id: 'ai-acceptance-criteria-definer', uid: 'ktx-10-acceptance-criteria-definer', name: 'AI Acceptance Criteria Definer', title: 'AI Acceptance Criteria Definer', route: '/ai-agent/product/acceptance-criteria-definer' },
      { id: 'ai-insight-synthesizer', uid: 'ktx-10-insight-synthesizer', name: 'AI Insight Synthesizer', title: 'AI Insight Synthesizer', route: '/ai-agent/product/insight-synthesizer' }
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
