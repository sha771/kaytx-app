import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-admin-operations',
    uid: 'ktx-13-vp-admin-operations',
    name: 'AI VP Admin Operations',
    title: 'AI VP Admin Operations',
    description: 'AI VP Admin Operations drives department strategy and oversees operations for the Administrative department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Meeting Facilitation', 'Administrative Reporting', 'Document Management', 'Scheduling', 'Office Management'],
    color: '#795548',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$1,800/mo',
    efficiency: '89% efficiency',
    replacesRole: 'AI VP Admin Operations',
    subAgents: [
      { id: 'ai-cost-reduction-analyst', uid: 'ktx-13-cost-reduction-analyst', name: 'AI Cost Reduction Analyst', title: 'AI Cost Reduction Analyst', route: '/ai-agent/administrative/cost-reduction-analyst' },
      { id: 'ai-schedule-coordinator', uid: 'ktx-13-schedule-coordinator', name: 'AI Schedule Coordinator', title: 'AI Schedule Coordinator', route: '/ai-agent/administrative/schedule-coordinator' },
      { id: 'ai-vendor-liaison', uid: 'ktx-13-vendor-liaison', name: 'AI Vendor Liaison', title: 'AI Vendor Liaison', route: '/ai-agent/administrative/vendor-liaison' }
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
      department: 'Administrative',
      level: 'vp_director',
      departmentId: 13,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
