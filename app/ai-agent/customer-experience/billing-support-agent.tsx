import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-billing-support-agent',
    uid: 'ktx-01-billing-support-agent',
    name: 'AI Billing Support Agent',
    title: 'AI Billing Support Agent',
    description: 'AI Billing Support Agent coordinates team activities and ensures quality output for the Customer Experience department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Customer Journey Mapping', 'Sentiment Analysis', 'Multi-channel Support', 'Churn Prediction', 'Loyalty Programs'],
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '83% efficiency',
    replacesRole: 'AI Billing Support Agent',
    subAgents: [
      { id: 'ai-win-back-campaign-specialist', uid: 'ktx-01-win-back-campaign-specialist', name: 'AI Win-back Campaign Specialist', title: 'AI Win-back Campaign Specialist', route: '/ai-agent/customer-experience/win-back-campaign-specialist' },
      { id: 'ai-complaint-categorizer', uid: 'ktx-01-complaint-categorizer', name: 'AI Complaint Categorizer', title: 'AI Complaint Categorizer', route: '/ai-agent/customer-experience/complaint-categorizer' },
      { id: 'ai-dispute-resolver', uid: 'ktx-01-dispute-resolver', name: 'AI Dispute Resolver', title: 'AI Dispute Resolver', route: '/ai-agent/customer-experience/dispute-resolver' }
    ],
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4136',
      tasksAutomatedDaily: 108,
      responseTime: '2.2s',
      accuracyRate: '94.0%',
    },
    hierarchy: {
      department: 'Customer Experience',
      level: 'team_lead',
      departmentId: 1,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
