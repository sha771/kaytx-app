import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-warehouse-lead',
    uid: 'ktx-21-warehouse-lead',
    name: 'AI Warehouse Lead',
    title: 'AI Warehouse Lead',
    description: 'AI Warehouse Lead coordinates team activities and ensures quality output for the Supply Chain & Logistics department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Procurement', 'Inventory Management', 'Supplier Relations', 'Demand Planning', 'Logistics Coordination'],
    color: '#42A5F5',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '94% efficiency',
    replacesRole: 'AI Warehouse Lead',
    subAgents: [
      { id: 'ai-sourcing-strategist', uid: 'ktx-21-sourcing-strategist', name: 'AI Sourcing Strategist', title: 'AI Sourcing Strategist', route: '/ai-agent/supply-chain/sourcing-strategist' },
      { id: 'ai-bid-analyzer', uid: 'ktx-21-bid-analyzer', name: 'AI Bid Analyzer', title: 'AI Bid Analyzer', route: '/ai-agent/supply-chain/bid-analyzer' },
      { id: 'ai-relationship-manager', uid: 'ktx-21-relationship-manager', name: 'AI Relationship Manager', title: 'AI Relationship Manager', route: '/ai-agent/supply-chain/relationship-manager' }
    ],
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3513',
      tasksAutomatedDaily: 389,
      responseTime: '1.7s',
      accuracyRate: '97.9%',
    },
    hierarchy: {
      department: 'Supply Chain & Logistics',
      level: 'team_lead',
      departmentId: 21,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
