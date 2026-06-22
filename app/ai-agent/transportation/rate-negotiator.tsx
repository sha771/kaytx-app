import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-rate-negotiator',
    uid: 'ktx-19-rate-negotiator',
    name: 'AI Rate Negotiator',
    title: 'AI Rate Negotiator',
    description: 'AI Rate Negotiator provides specialized expertise and executes critical tasks for the Transportation & Logistics department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Shipment Tracking', 'Warehouse Management', 'Carrier Relations', 'Customs Compliance', 'Demand Forecasting'],
    color: '#26A69A',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '81% efficiency',
    replacesRole: 'AI Rate Negotiator',
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
      department: 'Transportation & Logistics',
      level: 'specialist',
      departmentId: 19,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
