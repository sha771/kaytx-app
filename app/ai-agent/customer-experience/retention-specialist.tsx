import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-retention-specialist',
    uid: 'ktx-01-retention-specialist',
    name: 'AI Retention Specialist',
    title: 'AI Retention Specialist',
    description: 'AI Retention Specialist coordinates team activities and ensures quality output for the Customer Experience department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Customer Feedback Analysis', 'Customer Journey Mapping', 'Sentiment Analysis', 'Multi-channel Support', 'Churn Prediction'],
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '76% efficiency',
    replacesRole: 'AI Retention Specialist',
    subAgents: [
      { id: 'ai-experience-benchmark-analyst', uid: 'ktx-01-experience-benchmark-analyst', name: 'AI Experience Benchmark Analyst', title: 'AI Experience Benchmark Analyst', route: '/ai-agent/customer-experience/experience-benchmark-analyst' },
      { id: 'ai-ticket-classifier', uid: 'ktx-01-ticket-classifier', name: 'AI Ticket Classifier', title: 'AI Ticket Classifier', route: '/ai-agent/customer-experience/ticket-classifier' },
      { id: 'ai-insight-reporter', uid: 'ktx-01-insight-reporter', name: 'AI Insight Reporter', title: 'AI Insight Reporter', route: '/ai-agent/customer-experience/insight-reporter' }
    ],
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4047',
      tasksAutomatedDaily: 491,
      responseTime: '2.1s',
      accuracyRate: '99.3%',
    },
    hierarchy: {
      department: 'Customer Experience',
      level: 'team_lead',
      departmentId: 1,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
