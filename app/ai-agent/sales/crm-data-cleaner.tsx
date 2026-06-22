import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-crm-data-cleaner',
    uid: 'ktx-02-crm-data-cleaner',
    name: 'AI CRM Data Cleaner',
    title: 'AI CRM Data Cleaner',
    description: 'AI CRM Data Cleaner provides specialized expertise and executes critical tasks for the Sales & Revenue department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['CRM Integration', 'Deal Tracking', 'Revenue Optimization', 'Territory Management', 'Sales Coaching'],
    color: '#FFA000',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '88% efficiency',
    replacesRole: 'AI CRM Data Cleaner',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3691',
      tasksAutomatedDaily: 423,
      responseTime: '1.8s',
      accuracyRate: '98.4%',
    },
    hierarchy: {
      department: 'Sales & Revenue',
      level: 'specialist',
      departmentId: 2,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
