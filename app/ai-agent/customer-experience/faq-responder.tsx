import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-faq-responder',
    uid: 'ktx-01-faq-responder',
    name: 'AI FAQ Responder',
    title: 'AI FAQ Responder',
    description: 'AI FAQ Responder provides specialized expertise and executes critical tasks for the Customer Experience department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Customer Journey Mapping', 'Sentiment Analysis', 'Multi-channel Support', 'Churn Prediction', 'Loyalty Programs'],
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '87% efficiency',
    replacesRole: 'AI FAQ Responder',
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3424',
      tasksAutomatedDaily: 372,
      responseTime: '1.6s',
      accuracyRate: '97.7%',
    },
    hierarchy: {
      department: 'Customer Experience',
      level: 'specialist',
      departmentId: 1,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
