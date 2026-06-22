import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-public-engagement',
    uid: 'ktx-20-vp-public-engagement',
    name: 'AI VP Public Engagement',
    title: 'AI VP Public Engagement',
    description: 'AI VP Public Engagement drives department strategy and oversees operations for the Government & Public Sector department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Government Compliance', 'Policy Analysis', 'Public Engagement', 'Regulatory Development', 'Grant Management'],
    color: '#78909C',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$1,800/mo',
    efficiency: '76% efficiency',
    replacesRole: 'AI VP Public Engagement',
    subAgents: [
      { id: 'ai-policy-researcher', uid: 'ktx-20-policy-researcher', name: 'AI Policy Researcher', title: 'AI Policy Researcher', route: '/ai-agent/government/policy-researcher' },
      { id: 'ai-grant-opportunity-scanner', uid: 'ktx-20-grant-opportunity-scanner', name: 'AI Grant Opportunity Scanner', title: 'AI Grant Opportunity Scanner', route: '/ai-agent/government/grant-opportunity-scanner' },
      { id: 'ai-budget-preparer', uid: 'ktx-20-budget-preparer', name: 'AI Budget Preparer', title: 'AI Budget Preparer', route: '/ai-agent/government/budget-preparer' }
    ],
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11151',
      tasksAutomatedDaily: 529,
      responseTime: '2.1s',
      accuracyRate: '99.3%',
    },
    hierarchy: {
      department: 'Government & Public Sector',
      level: 'vp_director',
      departmentId: 20,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
