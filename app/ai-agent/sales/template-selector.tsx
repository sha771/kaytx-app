import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-template-selector',
    uid: 'ktx-02-template-selector',
    name: 'AI Template Selector',
    title: 'AI Template Selector',
    description: 'AI Template Selector leads strategic direction and executive decision-making for the Sales & Revenue department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Deal Tracking', 'Revenue Optimization', 'Territory Management', 'Sales Coaching', 'Lead Scoring'],
    color: '#FFA000',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '75% efficiency',
    replacesRole: 'AI Template Selector',
    infrastructure: {
      status: 'online',
      health: 85,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$10740',
      tasksAutomatedDaily: 960,
      responseTime: '1.9s',
      accuracyRate: '98.6%',
    },
    hierarchy: {
      department: 'Sales & Revenue',
      level: 'c_level',
      departmentId: 2,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
