import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-calendar-optimizer',
    uid: 'ktx-13-calendar-optimizer',
    name: 'AI Calendar Optimizer',
    title: 'AI Calendar Optimizer',
    description: 'AI Calendar Optimizer provides specialized expertise and executes critical tasks for the Administrative department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Travel Planning', 'Meeting Facilitation', 'Administrative Reporting', 'Document Management', 'Scheduling'],
    color: '#795548',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '82% efficiency',
    replacesRole: 'AI Calendar Optimizer',
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.0%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3869',
      tasksAutomatedDaily: 457,
      responseTime: '2.0s',
      accuracyRate: '98.8%',
    },
    hierarchy: {
      department: 'Administrative',
      level: 'specialist',
      departmentId: 13,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
