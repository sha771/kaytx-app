import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-production-planner',
    uid: 'ktx-18-production-planner',
    name: 'AI Production Planner',
    title: 'AI Production Planner',
    description: 'AI Production Planner coordinates team activities and ensures quality output for the Manufacturing & Production department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Supply Coordination', 'Safety Compliance', 'Process Engineering', 'Production Planning', 'Quality Control'],
    color: '#5C6BC0',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '82% efficiency',
    replacesRole: 'AI Production Planner',
    subAgents: [
      { id: 'ai-quality-standards-enforcer', uid: 'ktx-18-quality-standards-enforcer', name: 'AI Quality Standards Enforcer', title: 'AI Quality Standards Enforcer', route: '/ai-agent/manufacturing/quality-standards-enforcer' },
      { id: 'ai-order-sequencer', uid: 'ktx-18-order-sequencer', name: 'AI Order Sequencer', title: 'AI Order Sequencer', route: '/ai-agent/manufacturing/order-sequencer' },
      { id: 'ai-value-stream-mapper', uid: 'ktx-18-value-stream-mapper', name: 'AI Value Stream Mapper', title: 'AI Value Stream Mapper', route: '/ai-agent/manufacturing/value-stream-mapper' }
    ],
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.0%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3869',
      tasksAutomatedDaily: 457,
      responseTime: '2.0s',
      accuracyRate: '98.8%',
    },
    hierarchy: {
      department: 'Manufacturing & Production',
      level: 'team_lead',
      departmentId: 18,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
