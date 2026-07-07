import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-accountant',
    uid: 'ktx-17-accountant',
    name: 'AI Accountant',
    title: 'AI Accountant',
    description: 'AI Accountant provides accounting services, financial reporting, and billing management for the Professional Services department. This AI agent automates complex accounting workflows, provides intelligent financial insights, and collaborates with other agents to achieve optimal accounting outcomes with maximum efficiency.',
    capabilities: ['Financial Reporting', 'Billing Management', 'Expense Tracking', 'Revenue Recognition', 'Tax Preparation'],
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$70k/year',
    aiCost: '$1,400/mo',
    efficiency: '86% efficiency',
    replacesRole: 'AI Accountant',
    subAgents: [],
    infrastructure: {
      status: 'online',
      health: 86,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'medium',
    },
    roiMetrics: {
      savingsPerMonth: '$6675',
      tasksAutomatedDaily: 412,
      responseTime: '2.7s',
      accuracyRate: '94.2%',
    },
    hierarchy: {
      department: 'Professional Services',
      level: 'team_lead',
      departmentId: 17,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}