import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-lean-specialist',
    uid: 'ktx-18-lean-specialist',
    name: 'AI Lean Specialist',
    title: 'AI Lean Specialist',
    description: 'AI Lean Specialist coordinates team activities and ensures quality output for the Manufacturing & Production department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Inventory Management', 'Equipment Maintenance', 'Lean Manufacturing', 'Supply Coordination', 'Safety Compliance'],
    color: '#5C6BC0',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '81% efficiency',
    replacesRole: 'AI Lean Specialist',
    subAgents: [
      { id: 'ai-output-tracker', uid: 'ktx-18-output-tracker', name: 'AI Output Tracker', title: 'AI Output Tracker', route: '/ai-agent/manufacturing/output-tracker' },
      { id: 'ai-delivery-tracker', uid: 'ktx-18-delivery-tracker', name: 'AI Delivery Tracker', title: 'AI Delivery Tracker', route: '/ai-agent/manufacturing/delivery-tracker' },
      { id: 'ai-shipment-planner', uid: 'ktx-18-shipment-planner', name: 'AI Shipment Planner', title: 'AI Shipment Planner', route: '/ai-agent/manufacturing/shipment-planner' }
    ],
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3602',
      tasksAutomatedDaily: 406,
      responseTime: '1.8s',
      accuracyRate: '98.1%',
    },
    hierarchy: {
      department: 'Manufacturing & Production',
      level: 'team_lead',
      departmentId: 18,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
