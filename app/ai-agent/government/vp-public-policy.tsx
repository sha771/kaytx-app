import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-public-policy',
    uid: 'ktx-20-vp-public-policy',
    name: 'AI VP Public Policy',
    title: 'AI VP Public Policy',
    description: 'AI VP Public Policy drives department strategy and oversees operations for the Government & Public Sector department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Grant Management', 'Program Evaluation', 'Stakeholder Relations', 'Public Communications', 'Government Compliance'],
    color: '#78909C',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$1,800/mo',
    efficiency: '88% efficiency',
    replacesRole: 'AI VP Public Policy',
    subAgents: [
      { id: 'ai-budget-allocator', uid: 'ktx-20-budget-allocator', name: 'AI Budget Allocator', title: 'AI Budget Allocator', route: '/ai-agent/government/budget-allocator' },
      { id: 'ai-implementation-tracker', uid: 'ktx-20-implementation-tracker', name: 'AI Implementation Tracker', title: 'AI Implementation Tracker', route: '/ai-agent/government/implementation-tracker' },
      { id: 'ai-media-monitor', uid: 'ktx-20-media-monitor', name: 'AI Media Monitor', title: 'AI Media Monitor', route: '/ai-agent/government/media-monitor' }
    ],
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$10603',
      tasksAutomatedDaily: 937,
      responseTime: '1.8s',
      accuracyRate: '98.4%',
    },
    hierarchy: {
      department: 'Government & Public Sector',
      level: 'vp_director',
      departmentId: 20,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
