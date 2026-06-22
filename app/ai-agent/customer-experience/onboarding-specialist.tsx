import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-onboarding-specialist',
    uid: 'ktx-01-onboarding-specialist',
    name: 'AI Onboarding Specialist',
    title: 'AI Onboarding Specialist',
    description: 'AI Onboarding Specialist provides specialized expertise and executes critical tasks for the Customer Experience department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Customer Journey Mapping', 'Sentiment Analysis', 'Multi-channel Support', 'Churn Prediction', 'Loyalty Programs'],
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '83% efficiency',
    replacesRole: 'AI Onboarding Specialist',
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
      level: 'specialist',
      departmentId: 1,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
