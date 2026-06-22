import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-procurement-manager',
    uid: 'ktx-21-procurement-manager',
    name: 'AI Procurement Manager',
    title: 'AI Procurement Manager',
    description: 'AI Procurement Manager manages team operations and ensures delivery excellence for the Supply Chain & Logistics department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Cost Reduction', 'Sustainability Tracking', 'Supply Chain Optimization', 'Procurement', 'Inventory Management'],
    color: '#42A5F5',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '89% efficiency',
    replacesRole: 'AI Procurement Manager',
    subAgents: [
      { id: 'ai-network-designer', uid: 'ktx-21-network-designer', name: 'AI Network Designer', title: 'AI Network Designer', route: '/ai-agent/supply-chain/network-designer' },
      { id: 'ai-productivity-tracker', uid: 'ktx-21-productivity-tracker', name: 'AI Productivity Tracker', title: 'AI Productivity Tracker', route: '/ai-agent/supply-chain/productivity-tracker' },
      { id: 'ai-performance-scorer', uid: 'ktx-21-performance-scorer', name: 'AI Performance Scorer', title: 'AI Performance Scorer', route: '/ai-agent/supply-chain/performance-scorer' }
    ],
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.2%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3958',
      tasksAutomatedDaily: 474,
      responseTime: '2.0s',
      accuracyRate: '99.1%',
    },
    hierarchy: {
      department: 'Supply Chain & Logistics',
      level: 'manager',
      departmentId: 21,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
