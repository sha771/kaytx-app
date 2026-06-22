import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-alliance-coordinator',
    uid: 'ktx-02-alliance-coordinator',
    name: 'AI Alliance Coordinator',
    title: 'AI Alliance Coordinator',
    description: 'AI Alliance Coordinator leads strategic direction and executive decision-making for the Sales & Revenue department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Sales Coaching', 'Lead Scoring', 'Pipeline Management', 'Sales Forecasting', 'CRM Integration'],
    color: '#FFA000',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '76% efficiency',
    replacesRole: 'AI Alliance Coordinator',
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11151',
      tasksAutomatedDaily: 529,
      responseTime: '2.1s',
      accuracyRate: '99.3%',
    },
    hierarchy: {
      department: 'Sales & Revenue',
      level: 'c_level',
      departmentId: 2,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
