import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-experience',
    uid: 'ktx-01-vp-experience',
    name: 'AI VP Experience',
    title: 'AI VP Experience',
    description: 'AI VP Experience drives department strategy and oversees operations for the Customer Experience department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Customer Journey Mapping', 'Sentiment Analysis', 'Multi-channel Support', 'Churn Prediction', 'Loyalty Programs'],
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$1,800/mo',
    efficiency: '87% efficiency',
    replacesRole: 'AI VP Experience',
    subAgents: [
      { id: 'ai-onboarding-specialist', uid: 'ktx-01-onboarding-specialist', name: 'AI Onboarding Specialist', title: 'AI Onboarding Specialist', route: '/ai-agent/customer-experience/onboarding-specialist' },
      { id: 'ai-engagement-scoring-agent', uid: 'ktx-01-engagement-scoring-agent', name: 'AI Engagement Scoring Agent', title: 'AI Engagement Scoring Agent', route: '/ai-agent/customer-experience/engagement-scoring-agent' },
      { id: 'ai-offer-optimizer', uid: 'ktx-01-offer-optimizer', name: 'AI Offer Optimizer', title: 'AI Offer Optimizer', route: '/ai-agent/customer-experience/offer-optimizer' }
    ],
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$10192',
      tasksAutomatedDaily: 868,
      responseTime: '1.6s',
      accuracyRate: '97.7%',
    },
    hierarchy: {
      department: 'Customer Experience',
      level: 'vp_director',
      departmentId: 1,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
