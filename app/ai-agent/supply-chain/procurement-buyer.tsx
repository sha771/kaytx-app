import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-procurement-buyer',
    uid: 'ktx-21-procurement-buyer',
    name: 'AI Procurement Buyer',
    title: 'AI Procurement Buyer',
    description: 'AI Procurement Buyer coordinates team activities and ensures quality output for the Supply Chain & Logistics department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Demand Planning', 'Logistics Coordination', 'Cost Reduction', 'Sustainability Tracking', 'Supply Chain Optimization'],
    color: '#42A5F5',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '75% efficiency',
    replacesRole: 'AI Procurement Buyer',
    subAgents: [
      { id: 'ai-contract-negotiator', uid: 'ktx-21-contract-negotiator', name: 'AI Contract Negotiator', title: 'AI Contract Negotiator', route: '/ai-agent/supply-chain/contract-negotiator' },
      { id: 'ai-order-placer', uid: 'ktx-21-order-placer', name: 'AI Order Placer', title: 'AI Order Placer', route: '/ai-agent/supply-chain/order-placer' },
      { id: 'ai-carrier-booker', uid: 'ktx-21-carrier-booker', name: 'AI Carrier Booker', title: 'AI Carrier Booker', route: '/ai-agent/supply-chain/carrier-booker' }
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
      department: 'Supply Chain & Logistics',
      level: 'team_lead',
      departmentId: 21,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
