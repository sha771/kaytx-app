import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-last-mile-coordinator',
    uid: 'ktx-19-last-mile-coordinator',
    name: 'AI Last Mile Coordinator',
    title: 'AI Last Mile Coordinator',
    description: 'AI Last Mile Coordinator leads strategic direction and executive decision-making for the Transportation & Logistics department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Fleet Management', 'Route Optimization', 'Shipment Tracking', 'Warehouse Management', 'Carrier Relations'],
    color: '#26A69A',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '83% efficiency',
    replacesRole: 'AI Last Mile Coordinator',
    subAgents: [
      { id: 'ai-maintenance-planner', uid: 'ktx-19-maintenance-planner', name: 'AI Maintenance Planner', title: 'AI Maintenance Planner', route: '/ai-agent/transportation/maintenance-planner' },
      { id: 'ai-pick-pack-coordinator', uid: 'ktx-19-pick-pack-coordinator', name: 'AI Pick & Pack Coordinator', title: 'AI Pick & Pack Coordinator', route: '/ai-agent/transportation/pick-pack-coordinator' },
      { id: 'ai-duty-calculator', uid: 'ktx-19-duty-calculator', name: 'AI Duty Calculator', title: 'AI Duty Calculator', route: '/ai-agent/transportation/duty-calculator' }
    ],
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11288',
      tasksAutomatedDaily: 552,
      responseTime: '2.2s',
      accuracyRate: '94.0%',
    },
    hierarchy: {
      department: 'Transportation & Logistics',
      level: 'c_level',
      departmentId: 19,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
