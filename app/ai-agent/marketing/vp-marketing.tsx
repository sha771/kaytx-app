import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-marketing',
    uid: 'ktx-03-vp-marketing',
    name: 'AI VP Marketing',
    title: 'AI VP Marketing',
    description: 'AI VP Marketing drives department strategy and oversees operations for the Marketing & Growth department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Marketing Automation', 'Campaign Management', 'SEO Optimization', 'Content Strategy', 'Social Media Analytics'],
    color: '#E91E63',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$1,800/mo',
    efficiency: '80% efficiency',
    replacesRole: 'AI VP Marketing',
    subAgents: [
      { id: 'ai-budget-allocator', uid: 'ktx-03-budget-allocator', name: 'AI Budget Allocator', title: 'AI Budget Allocator', route: '/ai-agent/marketing/budget-allocator' },
      { id: 'ai-web-performance-tracker', uid: 'ktx-03-web-performance-tracker', name: 'AI Web Performance Tracker', title: 'AI Web Performance Tracker', route: '/ai-agent/marketing/web-performance-tracker' },
      { id: 'ai-template-designer', uid: 'ktx-03-template-designer', name: 'AI Template Designer', title: 'AI Template Designer', route: '/ai-agent/marketing/template-designer' }
    ],
    infrastructure: {
      status: 'online',
      health: 85,
      uptime: '99.2%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$10055',
      tasksAutomatedDaily: 845,
      responseTime: '1.6s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Marketing & Growth',
      level: 'vp_director',
      departmentId: 3,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
