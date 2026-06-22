import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-discovery-questioner',
    uid: 'ktx-02-discovery-questioner',
    name: 'AI Discovery Questioner',
    title: 'AI Discovery Questioner',
    description: 'AI Discovery Questioner provides specialized expertise and executes critical tasks for the Sales & Revenue department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Sales Coaching', 'Lead Scoring', 'Pipeline Management', 'Sales Forecasting', 'CRM Integration'],
    color: '#FFA000',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '76% efficiency',
    replacesRole: 'AI Discovery Questioner',
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
      department: 'Sales & Revenue',
      level: 'specialist',
      departmentId: 2,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
