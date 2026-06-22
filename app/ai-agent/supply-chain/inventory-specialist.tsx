import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-inventory-specialist',
    uid: 'ktx-21-inventory-specialist',
    name: 'AI Inventory Specialist',
    title: 'AI Inventory Specialist',
    description: 'AI Inventory Specialist coordinates team activities and ensures quality output for the Supply Chain & Logistics department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Sustainability Tracking', 'Supply Chain Optimization', 'Procurement', 'Inventory Management', 'Supplier Relations'],
    color: '#42A5F5',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '76% efficiency',
    replacesRole: 'AI Inventory Specialist',
    subAgents: [
      { id: 'ai-supplier-evaluator', uid: 'ktx-21-supplier-evaluator', name: 'AI Supplier Evaluator', title: 'AI Supplier Evaluator', route: '/ai-agent/supply-chain/supplier-evaluator' },
      { id: 'ai-stock-optimizer', uid: 'ktx-21-stock-optimizer', name: 'AI Stock Optimizer', title: 'AI Stock Optimizer', route: '/ai-agent/supply-chain/stock-optimizer' },
      { id: 'ai-document-preparer', uid: 'ktx-21-document-preparer', name: 'AI Document Preparer', title: 'AI Document Preparer', route: '/ai-agent/supply-chain/document-preparer' }
    ],
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4047',
      tasksAutomatedDaily: 491,
      responseTime: '2.1s',
      accuracyRate: '99.3%',
    },
    hierarchy: {
      department: 'Supply Chain & Logistics',
      level: 'team_lead',
      departmentId: 21,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
