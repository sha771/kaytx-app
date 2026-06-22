import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-public-affairs-specialist',
    uid: 'ktx-20-public-affairs-specialist',
    name: 'AI Public Affairs Specialist',
    title: 'AI Public Affairs Specialist',
    description: 'AI Public Affairs Specialist coordinates team activities and ensures quality output for the Government & Public Sector department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Program Evaluation', 'Stakeholder Relations', 'Public Communications', 'Government Compliance', 'Policy Analysis'],
    color: '#78909C',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '91% efficiency',
    replacesRole: 'AI Public Affairs Specialist',
    subAgents: [
      { id: 'ai-comment-drafter', uid: 'ktx-20-comment-drafter', name: 'AI Comment Drafter', title: 'AI Comment Drafter', route: '/ai-agent/government/comment-drafter' },
      { id: 'ai-recommendation-drafter', uid: 'ktx-20-recommendation-drafter', name: 'AI Recommendation Drafter', title: 'AI Recommendation Drafter', route: '/ai-agent/government/recommendation-drafter' },
      { id: 'ai-record-keeper', uid: 'ktx-20-record-keeper', name: 'AI Record Keeper', title: 'AI Record Keeper', route: '/ai-agent/government/record-keeper' }
    ],
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.0%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4492',
      tasksAutomatedDaily: 176,
      responseTime: '2.5s',
      accuracyRate: '94.9%',
    },
    hierarchy: {
      department: 'Government & Public Sector',
      level: 'team_lead',
      departmentId: 20,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
