import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-dispatcher',
    uid: 'ktx-19-dispatcher',
    name: 'AI Dispatcher',
    title: 'AI Dispatcher',
    description: 'AI Dispatcher coordinates team activities and ensures quality output for the Transportation & Logistics department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Customs Compliance', 'Demand Forecasting', 'Logistics Analytics', 'Fleet Management', 'Route Optimization'],
    color: '#26A69A',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '86% efficiency',
    replacesRole: 'AI Dispatcher',
    subAgents: [
      { id: 'ai-vehicle-scheduler', uid: 'ktx-19-vehicle-scheduler', name: 'AI Vehicle Scheduler', title: 'AI Vehicle Scheduler', route: '/ai-agent/transportation/vehicle-scheduler' },
      { id: 'ai-vehicle-tracker', uid: 'ktx-19-vehicle-tracker', name: 'AI Vehicle Tracker', title: 'AI Vehicle Tracker', route: '/ai-agent/transportation/vehicle-tracker' },
      { id: 'ai-carrier-qualifier', uid: 'ktx-19-carrier-qualifier', name: 'AI Carrier Qualifier', title: 'AI Carrier Qualifier', route: '/ai-agent/transportation/carrier-qualifier' }
    ],
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3157',
      tasksAutomatedDaily: 321,
      responseTime: '1.4s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Transportation & Logistics',
      level: 'team_lead',
      departmentId: 19,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
