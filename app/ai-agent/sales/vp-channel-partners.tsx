import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-channel-partners',
    uid: 'ktx-02-vp-channel-partners',
    name: 'AI VP Channel Partners',
    title: 'AI VP Channel Partners',
    description: 'AI VP Channel Partners drives department strategy and oversees operations for the Sales & Revenue department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Territory Management', 'Sales Coaching', 'Lead Scoring', 'Pipeline Management', 'Sales Forecasting'],
    color: '#FFA000',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$1,800/mo',
    efficiency: '89% efficiency',
    replacesRole: 'AI VP Channel Partners',
    subAgents: [
      { id: 'ai-revenue-modeler', uid: 'ktx-02-revenue-modeler', name: 'AI Revenue Modeler', title: 'AI Revenue Modeler', route: '/ai-agent/sales/revenue-modeler' },
      { id: 'ai-lead-scorer', uid: 'ktx-02-lead-scorer', name: 'AI Lead Scorer', title: 'AI Lead Scorer', route: '/ai-agent/sales/lead-scorer' },
      { id: 'ai-concession-tracker', uid: 'ktx-02-concession-tracker', name: 'AI Concession Tracker', title: 'AI Concession Tracker', route: '/ai-agent/sales/concession-tracker' }
    ],
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.2%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11014',
      tasksAutomatedDaily: 506,
      responseTime: '2.0s',
      accuracyRate: '99.1%',
    },
    hierarchy: {
      department: 'Sales & Revenue',
      level: 'vp_director',
      departmentId: 2,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
