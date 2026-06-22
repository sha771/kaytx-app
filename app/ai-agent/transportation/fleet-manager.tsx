import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-fleet-manager',
    uid: 'ktx-19-fleet-manager',
    name: 'AI Fleet Manager',
    title: 'AI Fleet Manager',
    description: 'AI Fleet Manager manages team operations and ensures delivery excellence for the Transportation & Logistics department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Fleet Management', 'Route Optimization', 'Shipment Tracking', 'Warehouse Management', 'Carrier Relations'],
    color: '#26A69A',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '87% efficiency',
    replacesRole: 'AI Fleet Manager',
    subAgents: [
      { id: 'ai-fleet-strategy-planner', uid: 'ktx-19-fleet-strategy-planner', name: 'AI Fleet Strategy Planner', title: 'AI Fleet Strategy Planner', route: '/ai-agent/transportation/fleet-strategy-planner' },
      { id: 'ai-carrier-allocator', uid: 'ktx-19-carrier-allocator', name: 'AI Carrier Allocator', title: 'AI Carrier Allocator', route: '/ai-agent/transportation/carrier-allocator' },
      { id: 'ai-eta-predictor', uid: 'ktx-19-eta-predictor', name: 'AI ETA Predictor', title: 'AI ETA Predictor', route: '/ai-agent/transportation/eta-predictor' }
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
      department: 'Transportation & Logistics',
      level: 'manager',
      departmentId: 19,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
