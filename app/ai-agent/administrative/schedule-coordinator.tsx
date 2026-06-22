import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-schedule-coordinator',
    uid: 'ktx-13-schedule-coordinator',
    name: 'AI Schedule Coordinator',
    title: 'AI Schedule Coordinator',
    description: 'AI Schedule Coordinator leads strategic direction and executive decision-making for the Administrative department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Administrative Reporting', 'Document Management', 'Scheduling', 'Office Management', 'Records Keeping'],
    color: '#795548',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '76% efficiency',
    replacesRole: 'AI Schedule Coordinator',
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11151',
      tasksAutomatedDaily: 529,
      responseTime: '2.1s',
      accuracyRate: '99.3%',
    },
    hierarchy: {
      department: 'Administrative',
      level: 'c_level',
      departmentId: 13,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
