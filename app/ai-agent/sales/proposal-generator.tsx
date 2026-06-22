import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-proposal-generator',
    uid: 'ktx-02-proposal-generator',
    name: 'AI Proposal Generator',
    title: 'AI Proposal Generator',
    description: 'AI Proposal Generator coordinates team activities and ensures quality output for the Sales & Revenue department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Revenue Optimization', 'Territory Management', 'Sales Coaching', 'Lead Scoring', 'Pipeline Management'],
    color: '#FFA000',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '82% efficiency',
    replacesRole: 'AI Proposal Generator',
    subAgents: [
      { id: 'ai-partner-onboarding-agent', uid: 'ktx-02-partner-onboarding-agent', name: 'AI Partner Onboarding Agent', title: 'AI Partner Onboarding Agent', route: '/ai-agent/sales/partner-onboarding-agent' },
      { id: 'ai-closing-strategist', uid: 'ktx-02-closing-strategist', name: 'AI Closing Strategist', title: 'AI Closing Strategist', route: '/ai-agent/sales/closing-strategist' },
      { id: 'ai-seasonality-adjuster', uid: 'ktx-02-seasonality-adjuster', name: 'AI Seasonality Adjuster', title: 'AI Seasonality Adjuster', route: '/ai-agent/sales/seasonality-adjuster' }
    ],
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.0%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3869',
      tasksAutomatedDaily: 457,
      responseTime: '2.0s',
      accuracyRate: '98.8%',
    },
    hierarchy: {
      department: 'Sales & Revenue',
      level: 'team_lead',
      departmentId: 2,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
