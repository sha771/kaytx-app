import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-sales-forecasting-agent',
    uid: 'ktx-02-sales-forecasting-agent',
    name: 'AI Sales Forecasting Agent',
    title: 'AI Sales Forecasting Agent',
    description: 'AI Sales Forecasting Agent coordinates team activities and ensures quality output for the Sales & Revenue department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Sales Forecasting', 'CRM Integration', 'Deal Tracking', 'Revenue Optimization', 'Territory Management'],
    color: '#FFA000',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '77% efficiency',
    replacesRole: 'AI Sales Forecasting Agent',
    subAgents: [
      { id: 'ai-crm-data-cleaner', uid: 'ktx-02-crm-data-cleaner', name: 'AI CRM Data Cleaner', title: 'AI CRM Data Cleaner', route: '/ai-agent/sales/crm-data-cleaner' },
      { id: 'ai-pipeline-organizer', uid: 'ktx-02-pipeline-organizer', name: 'AI Pipeline Organizer', title: 'AI Pipeline Organizer', route: '/ai-agent/sales/pipeline-organizer' },
      { id: 'ai-training-scheduler', uid: 'ktx-02-training-scheduler', name: 'AI Training Scheduler', title: 'AI Training Scheduler', route: '/ai-agent/sales/training-scheduler' }
    ],
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4314',
      tasksAutomatedDaily: 142,
      responseTime: '2.3s',
      accuracyRate: '94.5%',
    },
    hierarchy: {
      department: 'Sales & Revenue',
      level: 'team_lead',
      departmentId: 2,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
