import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-success-plan-coordinator',
    uid: 'ktx-01-success-plan-coordinator',
    name: 'AI Success Plan Coordinator',
    title: 'AI Success Plan Coordinator',
    description: 'AI Success Plan Coordinator leads strategic direction and executive decision-making for the Customer Experience department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Churn Prediction', 'Loyalty Programs', 'Ticket Routing', 'Knowledge Base Management', 'Customer Feedback Analysis'],
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '84% efficiency',
    replacesRole: 'AI Success Plan Coordinator',
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11699',
      tasksAutomatedDaily: 621,
      responseTime: '2.4s',
      accuracyRate: '94.7%',
    },
    hierarchy: {
      department: 'Customer Experience',
      level: 'c_level',
      departmentId: 1,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
