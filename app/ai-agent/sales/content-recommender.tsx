import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-content-recommender',
    uid: 'ktx-02-content-recommender',
    name: 'AI Content Recommender',
    title: 'AI Content Recommender',
    description: 'AI Content Recommender provides specialized expertise and executes critical tasks for the Sales & Revenue department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Territory Management', 'Sales Coaching', 'Lead Scoring', 'Pipeline Management', 'Sales Forecasting'],
    color: '#FFA000',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '89% efficiency',
    replacesRole: 'AI Content Recommender',
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.2%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3958',
      tasksAutomatedDaily: 474,
      responseTime: '2.0s',
      accuracyRate: '99.1%',
    },
    hierarchy: {
      department: 'Sales & Revenue',
      level: 'specialist',
      departmentId: 2,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
