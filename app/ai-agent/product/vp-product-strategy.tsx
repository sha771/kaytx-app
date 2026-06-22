import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-product-strategy',
    uid: 'ktx-10-vp-product-strategy',
    name: 'AI VP Product Strategy',
    title: 'AI VP Product Strategy',
    description: 'AI VP Product Strategy drives department strategy and oversees operations for the Product Management department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Market Analysis', 'Stakeholder Management', 'Product Roadmapping', 'Feature Prioritization', 'User Research'],
    color: '#FF5722',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$1,800/mo',
    efficiency: '89% efficiency',
    replacesRole: 'AI VP Product Strategy',
    subAgents: [
      { id: 'ai-feature-prioritizer', uid: 'ktx-10-feature-prioritizer', name: 'AI Feature Prioritizer', title: 'AI Feature Prioritizer', route: '/ai-agent/product/feature-prioritizer' },
      { id: 'ai-stakeholder-communicator', uid: 'ktx-10-stakeholder-communicator', name: 'AI Stakeholder Communicator', title: 'AI Stakeholder Communicator', route: '/ai-agent/product/stakeholder-communicator' },
      { id: 'ai-interview-scheduler', uid: 'ktx-10-interview-scheduler', name: 'AI Interview Scheduler', title: 'AI Interview Scheduler', route: '/ai-agent/product/interview-scheduler' }
    ],
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.2%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11014',
      tasksAutomatedDaily: 506,
      responseTime: '2.0s',
      accuracyRate: '99.1%',
    },
    hierarchy: {
      department: 'Product Management',
      level: 'vp_director',
      departmentId: 10,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
