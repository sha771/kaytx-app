import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-chief-administrative-officer',
    uid: 'ktx-13-chief-administrative-officer',
    name: 'AI Chief Administrative Officer',
    title: 'AI Chief Administrative Officer',
    description: 'AI Chief Administrative Officer leads strategic direction and executive decision-making for the Administrative department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Administrative Reporting', 'Document Management', 'Scheduling', 'Office Management', 'Records Keeping'],
    color: '#795548',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '92% efficiency',
    replacesRole: 'AI Chief Administrative Officer',
    subAgents: [
      { id: 'ai-admin-strategy-planner', uid: 'ktx-13-admin-strategy-planner', name: 'AI Admin Strategy Planner', title: 'AI Admin Strategy Planner', route: '/ai-agent/administrative/admin-strategy-planner' },
      { id: 'ai-task-delegator', uid: 'ktx-13-task-delegator', name: 'AI Task Delegator', title: 'AI Task Delegator', route: '/ai-agent/administrative/task-delegator' },
      { id: 'ai-work-order-manager', uid: 'ktx-13-work-order-manager', name: 'AI Work Order Manager', title: 'AI Work Order Manager', route: '/ai-agent/administrative/work-order-manager' }
    ],
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$8247',
      tasksAutomatedDaily: 713,
      responseTime: '0.7s',
      accuracyRate: '95.6%',
    },
    hierarchy: {
      department: 'Administrative',
      level: 'c_level',
      departmentId: 13,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
