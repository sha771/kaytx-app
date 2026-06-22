import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-work-order-manager',
    uid: 'ktx-13-work-order-manager',
    name: 'AI Work Order Manager',
    title: 'AI Work Order Manager',
    description: 'AI Work Order Manager manages team operations and ensures delivery excellence for the Administrative department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Travel Planning', 'Meeting Facilitation', 'Administrative Reporting', 'Document Management', 'Scheduling'],
    color: '#795548',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '82% efficiency',
    replacesRole: 'AI Work Order Manager',
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
      level: 'manager',
      departmentId: 13,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
