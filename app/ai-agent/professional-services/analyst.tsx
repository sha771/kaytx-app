import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-analyst',
    uid: 'ktx-17-analyst',
    name: 'AI Analyst',
    title: 'AI Analyst',
    description: 'AI Analyst provides data analysis, business intelligence, and reporting services for the Professional Services department. This AI agent automates complex analysis workflows, provides intelligent data insights, and collaborates with other agents to achieve optimal analytical outcomes with maximum efficiency.',
    capabilities: ['Data Analysis', 'Business Intelligence', 'Reporting', 'Performance Metrics', 'Trend Analysis'],
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$85k/year',
    aiCost: '$1,700/mo',
    efficiency: '84% efficiency',
    replacesRole: 'AI Analyst',
    subAgents: [],
    infrastructure: {
      status: 'online',
      health: 84,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'medium',
    },
    roiMetrics: {
      savingsPerMonth: '$8125',
      tasksAutomatedDaily: 456,
      responseTime: '2.6s',
      accuracyRate: '93.1%',
    },
    hierarchy: {
      department: 'Professional Services',
      level: 'team_lead',
      departmentId: 17,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}