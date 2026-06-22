import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-support',
    uid: 'ktx-01-vp-support',
    name: 'AI VP Support',
    title: 'AI VP Support',
    description: 'AI VP Support drives department strategy and oversees operations for the Customer Experience department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Ticket Routing', 'Knowledge Base Management', 'Customer Feedback Analysis', 'Customer Journey Mapping', 'Sentiment Analysis'],
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$1,800/mo',
    efficiency: '86% efficiency',
    replacesRole: 'AI VP Support',
    subAgents: [
      { id: 'ai-cx-metrics-tracker', uid: 'ktx-01-cx-metrics-tracker', name: 'AI CX Metrics Tracker', title: 'AI CX Metrics Tracker', route: '/ai-agent/customer-experience/cx-metrics-tracker' },
      { id: 'ai-loyalty-tier-analyst', uid: 'ktx-01-loyalty-tier-analyst', name: 'AI Loyalty Tier Analyst', title: 'AI Loyalty Tier Analyst', route: '/ai-agent/customer-experience/loyalty-tier-analyst' },
      { id: 'ai-at-risk-identifier', uid: 'ktx-01-at-risk-identifier', name: 'AI At-Risk Identifier', title: 'AI At-Risk Identifier', route: '/ai-agent/customer-experience/at-risk-identifier' }
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
      department: 'Customer Experience',
      level: 'vp_director',
      departmentId: 1,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
