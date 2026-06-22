import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-pipeline-weighter',
    uid: 'ktx-02-pipeline-weighter',
    name: 'AI Pipeline Weighter',
    title: 'AI Pipeline Weighter',
    description: 'AI Pipeline Weighter provides specialized expertise and executes critical tasks for the Sales & Revenue department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Deal Tracking', 'Revenue Optimization', 'Territory Management', 'Sales Coaching', 'Lead Scoring'],
    color: '#FFA000',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '75% efficiency',
    replacesRole: 'AI Pipeline Weighter',
    infrastructure: {
      status: 'online',
      health: 85,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3780',
      tasksAutomatedDaily: 440,
      responseTime: '1.9s',
      accuracyRate: '98.6%',
    },
    hierarchy: {
      department: 'Sales & Revenue',
      level: 'specialist',
      departmentId: 2,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
