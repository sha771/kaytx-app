import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-tax-specialist',
    uid: 'ktx-17-tax-specialist',
    name: 'AI Tax Specialist',
    title: 'AI Tax Specialist',
    description: 'AI Tax Specialist provides tax planning, compliance, and advisory services for the Professional Services department. This AI agent automates complex tax workflows, provides intelligent tax insights, and collaborates with other agents to achieve optimal tax outcomes with maximum efficiency.',
    capabilities: ['Tax Planning', 'Tax Compliance', 'Tax Advisory', 'Regulatory Updates', 'Tax Optimization'],
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$90k/year',
    aiCost: '$1,800/mo',
    efficiency: '92% efficiency',
    replacesRole: 'AI Tax Specialist',
    subAgents: [],
    infrastructure: {
      status: 'online',
      health: 92,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$8583',
      tasksAutomatedDaily: 489,
      responseTime: '2.1s',
      accuracyRate: '97.2%',
    },
    hierarchy: {
      department: 'Professional Services',
      level: 'team_lead',
      departmentId: 17,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}