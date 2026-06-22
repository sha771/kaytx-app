import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-churn-predictor',
    uid: 'ktx-01-churn-predictor',
    name: 'AI Churn Predictor',
    title: 'AI Churn Predictor',
    description: 'AI Churn Predictor leads strategic direction and executive decision-making for the Customer Experience department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Multi-channel Support', 'Churn Prediction', 'Loyalty Programs', 'Ticket Routing', 'Knowledge Base Management'],
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '81% efficiency',
    replacesRole: 'AI Churn Predictor',
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$10466',
      tasksAutomatedDaily: 914,
      responseTime: '1.8s',
      accuracyRate: '98.1%',
    },
    hierarchy: {
      department: 'Customer Experience',
      level: 'c_level',
      departmentId: 1,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
