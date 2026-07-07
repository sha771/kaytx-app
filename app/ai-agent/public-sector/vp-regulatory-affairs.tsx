import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-regulatory-affairs',
    uid: 'ktx-20-vp-regulatory-affairs',
    name: 'AI VP Regulatory Affairs',
    title: 'AI VP Regulatory Affairs',
    description: 'AI VP Regulatory Affairs drives department strategy and oversees operations for the Government & Public Sector department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Policy Analysis', 'Public Engagement', 'Regulatory Development', 'Grant Management', 'Program Evaluation'],
    color: '#78909C',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$1,800/mo',
    efficiency: '83% efficiency',
    replacesRole: 'AI VP Regulatory Affairs',
    subAgents: [
      { id: 'ai-inter-agency-coordinator', uid: 'ktx-20-inter-agency-coordinator', name: 'AI Inter-agency Coordinator', title: 'AI Inter-agency Coordinator', route: '/ai-agent/government/inter-agency-coordinator' },
      { id: 'ai-review-scheduler', uid: 'ktx-20-review-scheduler', name: 'AI Review Scheduler', title: 'AI Review Scheduler', route: '/ai-agent/government/review-scheduler' },
      { id: 'ai-crisis-communicator', uid: 'ktx-20-crisis-communicator', name: 'AI Crisis Communicator', title: 'AI Crisis Communicator', route: '/ai-agent/government/crisis-communicator' }
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
      department: 'Government & Public Sector',
      level: 'vp_director',
      departmentId: 20,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
