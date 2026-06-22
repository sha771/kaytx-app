import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-shipping-coordinator',
    uid: 'ktx-21-shipping-coordinator',
    name: 'AI Shipping Coordinator',
    title: 'AI Shipping Coordinator',
    description: 'AI Shipping Coordinator leads strategic direction and executive decision-making for the Supply Chain & Logistics department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Sustainability Tracking', 'Supply Chain Optimization', 'Procurement', 'Inventory Management', 'Supplier Relations'],
    color: '#42A5F5',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '76% efficiency',
    replacesRole: 'AI Shipping Coordinator',
    subAgents: [
      { id: 'ai-service-level-monitor', uid: 'ktx-21-service-level-monitor', name: 'AI Service Level Monitor', title: 'AI Service Level Monitor', route: '/ai-agent/supply-chain/service-level-monitor' },
      { id: 'ai-forecast-modeler', uid: 'ktx-21-forecast-modeler', name: 'AI Forecast Modeler', title: 'AI Forecast Modeler', route: '/ai-agent/supply-chain/forecast-modeler' },
      { id: 'ai-pick-list-generator', uid: 'ktx-21-pick-list-generator', name: 'AI Pick List Generator', title: 'AI Pick List Generator', route: '/ai-agent/supply-chain/pick-list-generator' }
    ],
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11151',
      tasksAutomatedDaily: 529,
      responseTime: '2.1s',
      accuracyRate: '99.3%',
    },
    hierarchy: {
      department: 'Supply Chain & Logistics',
      level: 'c_level',
      departmentId: 21,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
