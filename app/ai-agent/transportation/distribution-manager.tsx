import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-distribution-manager',
    uid: 'ktx-19-distribution-manager',
    name: 'AI Distribution Manager',
    title: 'AI Distribution Manager',
    description: 'AI Distribution Manager manages team operations and ensures delivery excellence for the Transportation & Logistics department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Logistics Analytics', 'Fleet Management', 'Route Optimization', 'Shipment Tracking', 'Warehouse Management'],
    color: '#26A69A',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '76% efficiency',
    replacesRole: 'AI Distribution Manager',
    subAgents: [
      { id: 'ai-capacity-planner', uid: 'ktx-19-capacity-planner', name: 'AI Capacity Planner', title: 'AI Capacity Planner', route: '/ai-agent/transportation/capacity-planner' },
      { id: 'ai-multi-stop-planner', uid: 'ktx-19-multi-stop-planner', name: 'AI Multi-stop Planner', title: 'AI Multi-stop Planner', route: '/ai-agent/transportation/multi-stop-planner' },
      { id: 'ai-delivery-window-negotiator', uid: 'ktx-19-delivery-window-negotiator', name: 'AI Delivery Window Negotiator', title: 'AI Delivery Window Negotiator', route: '/ai-agent/transportation/delivery-window-negotiator' }
    ],
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4047',
      tasksAutomatedDaily: 491,
      responseTime: '2.1s',
      accuracyRate: '99.3%',
    },
    hierarchy: {
      department: 'Transportation & Logistics',
      level: 'manager',
      departmentId: 19,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
