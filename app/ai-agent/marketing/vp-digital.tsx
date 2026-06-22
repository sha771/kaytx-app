import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-digital',
    uid: 'ktx-03-vp-digital',
    name: 'AI VP Digital',
    title: 'AI VP Digital',
    description: 'AI VP Digital drives department strategy and oversees operations for the Marketing & Growth department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Growth Hacking', 'A/B Testing', 'Marketing Automation', 'Campaign Management', 'SEO Optimization'],
    color: '#E91E63',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$1,800/mo',
    efficiency: '86% efficiency',
    replacesRole: 'AI VP Digital',
    subAgents: [
      { id: 'ai-campaign-coordinator', uid: 'ktx-03-campaign-coordinator', name: 'AI Campaign Coordinator', title: 'AI Campaign Coordinator', route: '/ai-agent/marketing/campaign-coordinator' },
      { id: 'ai-marketing-spend-monitor', uid: 'ktx-03-marketing-spend-monitor', name: 'AI Marketing Spend Monitor', title: 'AI Marketing Spend Monitor', route: '/ai-agent/marketing/marketing-spend-monitor' },
      { id: 'ai-audience-targeter', uid: 'ktx-03-audience-targeter', name: 'AI Audience Targeter', title: 'AI Audience Targeter', route: '/ai-agent/marketing/audience-targeter' }
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
      department: 'Marketing & Growth',
      level: 'vp_director',
      departmentId: 3,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
