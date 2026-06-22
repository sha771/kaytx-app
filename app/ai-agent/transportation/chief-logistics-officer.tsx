import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-chief-logistics-officer',
    uid: 'ktx-19-chief-logistics-officer',
    name: 'AI Chief Logistics Officer',
    title: 'AI Chief Logistics Officer',
    description: 'AI Chief Logistics Officer leads strategic direction and executive decision-making for the Transportation & Logistics department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Shipment Tracking', 'Warehouse Management', 'Carrier Relations', 'Customs Compliance', 'Demand Forecasting'],
    color: '#26A69A',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '77% efficiency',
    replacesRole: 'AI Chief Logistics Officer',
    subAgents: [
      { id: 'ai-logistics-strategy-advisor', uid: 'ktx-19-logistics-strategy-advisor', name: 'AI Logistics Strategy Advisor', title: 'AI Logistics Strategy Advisor', route: '/ai-agent/transportation/logistics-strategy-advisor' },
      { id: 'ai-labor-scheduler', uid: 'ktx-19-labor-scheduler', name: 'AI Labor Scheduler', title: 'AI Labor Scheduler', route: '/ai-agent/transportation/labor-scheduler' },
      { id: 'ai-driver-communicator', uid: 'ktx-19-driver-communicator', name: 'AI Driver Communicator', title: 'AI Driver Communicator', route: '/ai-agent/transportation/driver-communicator' }
    ],
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11562',
      tasksAutomatedDaily: 598,
      responseTime: '2.3s',
      accuracyRate: '94.5%',
    },
    hierarchy: {
      department: 'Transportation & Logistics',
      level: 'c_level',
      departmentId: 19,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
