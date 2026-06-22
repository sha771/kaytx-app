import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-customer-support-agent',
    uid: 'ktx-01-customer-support-agent',
    name: 'AI Customer Support Agent',
    title: 'AI Customer Support Agent',
    description: 'AI Customer Support Agent coordinates team activities and ensures quality output for the Customer Experience department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Sentiment Analysis', 'Multi-channel Support', 'Churn Prediction', 'Loyalty Programs', 'Ticket Routing'],
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '90% efficiency',
    replacesRole: 'AI Customer Support Agent',
    subAgents: [
      { id: 'ai-knowledge-base-curator', uid: 'ktx-01-knowledge-base-curator', name: 'AI Knowledge Base Curator', title: 'AI Knowledge Base Curator', route: '/ai-agent/customer-experience/knowledge-base-curator' },
      { id: 'ai-faq-responder', uid: 'ktx-01-faq-responder', name: 'AI FAQ Responder', title: 'AI FAQ Responder', route: '/ai-agent/customer-experience/faq-responder' },
      { id: 'ai-engagement-tracker', uid: 'ktx-01-engagement-tracker', name: 'AI Engagement Tracker', title: 'AI Engagement Tracker', route: '/ai-agent/customer-experience/engagement-tracker' }
    ],
    infrastructure: {
      status: 'online',
      health: 85,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4225',
      tasksAutomatedDaily: 125,
      responseTime: '2.3s',
      accuracyRate: '94.3%',
    },
    hierarchy: {
      department: 'Customer Experience',
      level: 'team_lead',
      departmentId: 1,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
