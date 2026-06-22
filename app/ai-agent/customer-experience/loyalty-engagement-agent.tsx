import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-loyalty-engagement-agent',
    uid: 'ktx-01-loyalty-engagement-agent',
    name: 'AI Loyalty & Engagement Agent',
    title: 'AI Loyalty & Engagement Agent',
    description: 'AI Loyalty & Engagement Agent coordinates team activities and ensures quality output for the Customer Experience department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Ticket Routing', 'Knowledge Base Management', 'Customer Feedback Analysis', 'Customer Journey Mapping', 'Sentiment Analysis'],
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '78% efficiency',
    replacesRole: 'AI Loyalty & Engagement Agent',
    subAgents: [
      { id: 'ai-personalization-engine', uid: 'ktx-01-personalization-engine', name: 'AI Personalization Engine', title: 'AI Personalization Engine', route: '/ai-agent/customer-experience/personalization-engine' },
      { id: 'ai-solution-matcher', uid: 'ktx-01-solution-matcher', name: 'AI Solution Matcher', title: 'AI Solution Matcher', route: '/ai-agent/customer-experience/solution-matcher' },
      { id: 'ai-payment-processor', uid: 'ktx-01-payment-processor', name: 'AI Payment Processor', title: 'AI Payment Processor', route: '/ai-agent/customer-experience/payment-processor' }
    ],
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.2%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4581',
      tasksAutomatedDaily: 193,
      responseTime: '0.5s',
      accuracyRate: '95.2%',
    },
    hierarchy: {
      department: 'Customer Experience',
      level: 'team_lead',
      departmentId: 1,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
