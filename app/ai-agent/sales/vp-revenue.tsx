import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-revenue',
    uid: 'ktx-02-vp-revenue',
    name: 'AI VP Revenue',
    title: 'AI VP Revenue',
    description: 'AI VP Revenue drives department strategy and oversees operations for the Sales & Revenue department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Revenue Optimization', 'Territory Management', 'Sales Coaching', 'Lead Scoring', 'Pipeline Management'],
    color: '#FFA000',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$1,800/mo',
    efficiency: '86% efficiency',
    replacesRole: 'AI VP Revenue',
    subAgents: [
      { id: 'ai-quota-tracker', uid: 'ktx-02-quota-tracker', name: 'AI Quota Tracker', title: 'AI Quota Tracker', route: '/ai-agent/sales/quota-tracker' },
      { id: 'ai-prospect-researcher', uid: 'ktx-02-prospect-researcher', name: 'AI Prospect Researcher', title: 'AI Prospect Researcher', route: '/ai-agent/sales/prospect-researcher' },
      { id: 'ai-proposal-reviewer', uid: 'ktx-02-proposal-reviewer', name: 'AI Proposal Reviewer', title: 'AI Proposal Reviewer', route: '/ai-agent/sales/proposal-reviewer' }
    ],
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$9781',
      tasksAutomatedDaily: 799,
      responseTime: '1.4s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Sales & Revenue',
      level: 'vp_director',
      departmentId: 2,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
