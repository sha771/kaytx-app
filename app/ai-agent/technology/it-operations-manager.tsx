import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-it-operations-manager',
    uid: 'ktx-06-it-operations-manager',
    name: 'AI IT Operations Manager',
    title: 'AI IT Operations Manager',
    description: 'AI IT Operations Manager manages day-to-day IT operations ensuring system availability, performance, and reliability through effective monitoring, incident management, and operational excellence initiatives.',
    capabilities: ['Operations Management', 'Incident Management', 'Monitoring', 'Performance Management', 'Team Leadership'],
    color: '#455A64',
    type: 'agent' as const,
    humanCost: '$95k/year',
    aiCost: '$1,200/mo',
    efficiency: '90% efficiency',
    replacesRole: 'IT Operations Manager',
    infrastructure: {
      status: 'online',
      health: 95,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6536',
      tasksAutomatedDaily: 266,
      responseTime: '2.1s',
      accuracyRate: '95.3%',
    },
    hierarchy: {
      department: 'Technology & Engineering',
      level: 'manager',
      departmentId: 6,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
