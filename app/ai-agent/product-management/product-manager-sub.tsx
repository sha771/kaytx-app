import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-product-manager-sub',
    uid: 'ktx-10-product-manager-sub',
    name: 'AI Product Manager (sub)',
    title: 'AI Product Manager (sub)',
    description: 'AI Product Manager (sub) manages team operations and ensures delivery excellence for the Product Management department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Product Roadmapping', 'Feature Prioritization', 'User Research', 'Sprint Planning', 'A/B Testing'],
    color: '#FF5722',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '83% efficiency',
    replacesRole: 'AI Product Manager (sub)',
    subAgents: [
      { id: 'ai-vision-communicator', uid: 'ktx-10-vision-communicator', name: 'AI Vision Communicator', title: 'AI Vision Communicator', route: '/ai-agent/product/vision-communicator' },
      { id: 'ai-feature-spec-writer', uid: 'ktx-10-feature-spec-writer', name: 'AI Feature Spec Writer', title: 'AI Feature Spec Writer', route: '/ai-agent/product/feature-spec-writer' },
      { id: 'ai-messaging-crafter', uid: 'ktx-10-messaging-crafter', name: 'AI Messaging Crafter', title: 'AI Messaging Crafter', route: '/ai-agent/product/messaging-crafter' }
    ],
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4136',
      tasksAutomatedDaily: 108,
      responseTime: '2.2s',
      accuracyRate: '94.0%',
    },
    hierarchy: {
      department: 'Product Management',
      level: 'manager',
      departmentId: 10,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
