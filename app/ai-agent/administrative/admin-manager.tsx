import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-admin-manager',
    uid: 'ktx-13-admin-manager',
    name: 'AI Admin Manager',
    title: 'AI Admin Manager',
    description: 'AI Admin Manager manages team operations and ensures delivery excellence for the Administrative department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Document Management', 'Scheduling', 'Office Management', 'Records Keeping', 'Communication Coordination'],
    color: '#795548',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '87% efficiency',
    replacesRole: 'AI Admin Manager',
    subAgents: [
      { id: 'ai-process-standardizer', uid: 'ktx-13-process-standardizer', name: 'AI Process Standardizer', title: 'AI Process Standardizer', route: '/ai-agent/administrative/process-standardizer' },
      { id: 'ai-meeting-room-booker', uid: 'ktx-13-meeting-room-booker', name: 'AI Meeting Room Booker', title: 'AI Meeting Room Booker', route: '/ai-agent/administrative/meeting-room-booker' },
      { id: 'ai-itinerary-planner', uid: 'ktx-13-itinerary-planner', name: 'AI Itinerary Planner', title: 'AI Itinerary Planner', route: '/ai-agent/administrative/itinerary-planner' }
    ],
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3424',
      tasksAutomatedDaily: 372,
      responseTime: '1.6s',
      accuracyRate: '97.7%',
    },
    hierarchy: {
      department: 'Administrative',
      level: 'manager',
      departmentId: 13,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
