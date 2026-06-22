import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-warehouse-manager',
    uid: 'ktx-19-warehouse-manager',
    name: 'AI Warehouse Manager',
    title: 'AI Warehouse Manager',
    description: 'AI Warehouse Manager manages team operations and ensures delivery excellence for the Transportation & Logistics department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Carrier Relations', 'Customs Compliance', 'Demand Forecasting', 'Logistics Analytics', 'Fleet Management'],
    color: '#26A69A',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '75% efficiency',
    replacesRole: 'AI Warehouse Manager',
    subAgents: [
      { id: 'ai-route-network-designer', uid: 'ktx-19-route-network-designer', name: 'AI Route Network Designer', title: 'AI Route Network Designer', route: '/ai-agent/transportation/route-network-designer' },
      { id: 'ai-traffic-predictor', uid: 'ktx-19-traffic-predictor', name: 'AI Traffic Predictor', title: 'AI Traffic Predictor', route: '/ai-agent/transportation/traffic-predictor' },
      { id: 'ai-exception-alerter', uid: 'ktx-19-exception-alerter', name: 'AI Exception Alerter', title: 'AI Exception Alerter', route: '/ai-agent/transportation/exception-alerter' }
    ],
    infrastructure: {
      status: 'online',
      health: 85,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3780',
      tasksAutomatedDaily: 440,
      responseTime: '1.9s',
      accuracyRate: '98.6%',
    },
    hierarchy: {
      department: 'Transportation & Logistics',
      level: 'manager',
      departmentId: 19,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
