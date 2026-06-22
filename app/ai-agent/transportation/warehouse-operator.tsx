import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-warehouse-operator',
    uid: 'ktx-19-warehouse-operator',
    name: 'AI Warehouse Operator',
    title: 'AI Warehouse Operator',
    description: 'AI Warehouse Operator coordinates team activities and ensures quality output for the Transportation & Logistics department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Customs Compliance', 'Demand Forecasting', 'Logistics Analytics', 'Fleet Management', 'Route Optimization'],
    color: '#26A69A',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '82% efficiency',
    replacesRole: 'AI Warehouse Operator',
    subAgents: [
      { id: 'ai-sla-enforcer', uid: 'ktx-19-sla-enforcer', name: 'AI SLA Enforcer', title: 'AI SLA Enforcer', route: '/ai-agent/transportation/sla-enforcer' },
      { id: 'ai-driver-assignment-agent', uid: 'ktx-19-driver-assignment-agent', name: 'AI Driver Assignment Agent', title: 'AI Driver Assignment Agent', route: '/ai-agent/transportation/driver-assignment-agent' },
      { id: 'ai-rate-negotiator', uid: 'ktx-19-rate-negotiator', name: 'AI Rate Negotiator', title: 'AI Rate Negotiator', route: '/ai-agent/transportation/rate-negotiator' }
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
      department: 'Transportation & Logistics',
      level: 'team_lead',
      departmentId: 19,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
