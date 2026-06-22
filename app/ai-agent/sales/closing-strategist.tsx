import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-closing-strategist',
    uid: 'ktx-02-closing-strategist',
    name: 'AI Closing Strategist',
    title: 'AI Closing Strategist',
    description: 'AI Closing Strategist leads strategic direction and executive decision-making for the Sales & Revenue department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Revenue Optimization', 'Territory Management', 'Sales Coaching', 'Lead Scoring', 'Pipeline Management'],
    color: '#FFA000',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '82% efficiency',
    replacesRole: 'AI Closing Strategist',
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.0%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$10877',
      tasksAutomatedDaily: 983,
      responseTime: '2.0s',
      accuracyRate: '98.8%',
    },
    hierarchy: {
      department: 'Sales & Revenue',
      level: 'c_level',
      departmentId: 2,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
