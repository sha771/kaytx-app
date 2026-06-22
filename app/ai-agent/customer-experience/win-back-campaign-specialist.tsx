import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-win-back-campaign-specialist',
    uid: 'ktx-01-win-back-campaign-specialist',
    name: 'AI Win-back Campaign Specialist',
    title: 'AI Win-back Campaign Specialist',
    description: 'AI Win-back Campaign Specialist provides specialized expertise and executes critical tasks for the Customer Experience department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Customer Feedback Analysis', 'Customer Journey Mapping', 'Sentiment Analysis', 'Multi-channel Support', 'Churn Prediction'],
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '92% efficiency',
    replacesRole: 'AI Win-back Campaign Specialist',
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4759',
      tasksAutomatedDaily: 227,
      responseTime: '0.7s',
      accuracyRate: '95.6%',
    },
    hierarchy: {
      department: 'Customer Experience',
      level: 'specialist',
      departmentId: 1,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
