import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-transparency-officer',
    uid: 'ktx-20-transparency-officer',
    name: 'AI Transparency Officer',
    title: 'AI Transparency Officer',
    description: 'AI Transparency Officer coordinates team activities and ensures quality output for the Government & Public Sector department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Government Compliance', 'Policy Analysis', 'Public Engagement', 'Regulatory Development', 'Grant Management'],
    color: '#78909C',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '76% efficiency',
    replacesRole: 'AI Transparency Officer',
    subAgents: [
      { id: 'ai-communication-strategist', uid: 'ktx-20-communication-strategist', name: 'AI Communication Strategist', title: 'AI Communication Strategist', route: '/ai-agent/government/communication-strategist' },
      { id: 'ai-filing-coordinator', uid: 'ktx-20-filing-coordinator', name: 'AI Filing Coordinator', title: 'AI Filing Coordinator', route: '/ai-agent/government/filing-coordinator' },
      { id: 'ai-accountability-auditor', uid: 'ktx-20-accountability-auditor', name: 'AI Accountability Auditor', title: 'AI Accountability Auditor', route: '/ai-agent/government/accountability-auditor' }
    ],
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4047',
      tasksAutomatedDaily: 491,
      responseTime: '2.1s',
      accuracyRate: '99.3%',
    },
    hierarchy: {
      department: 'Government & Public Sector',
      level: 'team_lead',
      departmentId: 20,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
