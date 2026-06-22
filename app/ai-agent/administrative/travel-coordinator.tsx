import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-travel-coordinator',
    uid: 'ktx-13-travel-coordinator',
    name: 'AI Travel Coordinator',
    title: 'AI Travel Coordinator',
    description: 'AI Travel Coordinator leads strategic direction and executive decision-making for the Administrative department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Travel Planning', 'Meeting Facilitation', 'Administrative Reporting', 'Document Management', 'Scheduling'],
    color: '#795548',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '82% efficiency',
    replacesRole: 'AI Travel Coordinator',
    subAgents: [
      { id: 'ai-maintenance-scheduler', uid: 'ktx-13-maintenance-scheduler', name: 'AI Maintenance Scheduler', title: 'AI Maintenance Scheduler', route: '/ai-agent/administrative/maintenance-scheduler' },
      { id: 'ai-travel-booker', uid: 'ktx-13-travel-booker', name: 'AI Travel Booker', title: 'AI Travel Booker', route: '/ai-agent/administrative/travel-booker' },
      { id: 'ai-archive-organizer', uid: 'ktx-13-archive-organizer', name: 'AI Archive Organizer', title: 'AI Archive Organizer', route: '/ai-agent/administrative/archive-organizer' }
    ],
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
      department: 'Administrative',
      level: 'c_level',
      departmentId: 13,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
