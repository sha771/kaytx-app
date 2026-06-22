import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-co-marketing-coordinator',
    uid: 'ktx-02-co-marketing-coordinator',
    name: 'AI Co-marketing Coordinator',
    title: 'AI Co-marketing Coordinator',
    description: 'AI Co-marketing Coordinator leads strategic direction and executive decision-making for the Sales & Revenue department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['CRM Integration', 'Deal Tracking', 'Revenue Optimization', 'Territory Management', 'Sales Coaching'],
    color: '#FFA000',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '84% efficiency',
    replacesRole: 'AI Co-marketing Coordinator',
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11699',
      tasksAutomatedDaily: 621,
      responseTime: '2.4s',
      accuracyRate: '94.7%',
    },
    hierarchy: {
      department: 'Sales & Revenue',
      level: 'c_level',
      departmentId: 2,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
