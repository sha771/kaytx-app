import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-lead-scorer',
    uid: 'ktx-02-lead-scorer',
    name: 'AI Lead Scorer',
    title: 'AI Lead Scorer',
    description: 'AI Lead Scorer manages team operations and ensures delivery excellence for the Sales & Revenue department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Territory Management', 'Sales Coaching', 'Lead Scoring', 'Pipeline Management', 'Sales Forecasting'],
    color: '#FFA000',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '93% efficiency',
    replacesRole: 'AI Lead Scorer',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.0%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3246',
      tasksAutomatedDaily: 338,
      responseTime: '1.5s',
      accuracyRate: '97.2%',
    },
    hierarchy: {
      department: 'Sales & Revenue',
      level: 'manager',
      departmentId: 2,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
