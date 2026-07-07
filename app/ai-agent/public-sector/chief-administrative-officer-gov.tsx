import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-chief-administrative-officer-gov',
    uid: 'ktx-20-chief-administrative-officer-gov',
    name: 'AI Chief Administrative Officer (Gov)',
    title: 'AI Chief Administrative Officer (Gov)',
    description: 'AI Chief Administrative Officer (Gov) leads strategic direction and executive decision-making for the Government & Public Sector department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Stakeholder Relations', 'Public Communications', 'Government Compliance', 'Policy Analysis', 'Public Engagement'],
    color: '#78909C',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '94% efficiency',
    replacesRole: 'AI Chief Administrative Officer (Gov)',
    subAgents: [
      { id: 'ai-public-sector-strategy-advisor', uid: 'ktx-20-public-sector-strategy-advisor', name: 'AI Public Sector Strategy Advisor', title: 'AI Public Sector Strategy Advisor', route: '/ai-agent/government/public-sector-strategy-advisor' },
      { id: 'ai-policy-drafter', uid: 'ktx-20-policy-drafter', name: 'AI Policy Drafter', title: 'AI Policy Drafter', route: '/ai-agent/government/policy-drafter' },
      { id: 'ai-press-release-writer', uid: 'ktx-20-press-release-writer', name: 'AI Press Release Writer', title: 'AI Press Release Writer', route: '/ai-agent/government/press-release-writer' }
    ],
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$9069',
      tasksAutomatedDaily: 851,
      responseTime: '1.1s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Government & Public Sector',
      level: 'c_level',
      departmentId: 20,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
