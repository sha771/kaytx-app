import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-logistics-manager',
    uid: 'ktx-21-logistics-manager',
    name: 'AI Logistics Manager',
    title: 'AI Logistics Manager',
    description: 'AI Logistics Manager manages team operations and ensures delivery excellence for the Supply Chain & Logistics department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Demand Planning', 'Logistics Coordination', 'Cost Reduction', 'Sustainability Tracking', 'Supply Chain Optimization'],
    color: '#42A5F5',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '75% efficiency',
    replacesRole: 'AI Logistics Manager',
    subAgents: [
      { id: 'ai-cost-optimizer', uid: 'ktx-21-cost-optimizer', name: 'AI Cost Optimizer', title: 'AI Cost Optimizer', route: '/ai-agent/supply-chain/cost-optimizer' },
      { id: 'ai-rfq-issuer', uid: 'ktx-21-rfq-issuer', name: 'AI RFQ Issuer', title: 'AI RFQ Issuer', route: '/ai-agent/supply-chain/rfq-issuer' },
      { id: 'ai-risk-monitor', uid: 'ktx-21-risk-monitor', name: 'AI Risk Monitor', title: 'AI Risk Monitor', route: '/ai-agent/supply-chain/risk-monitor' }
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
      level: 'manager',
      departmentId: 21,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
