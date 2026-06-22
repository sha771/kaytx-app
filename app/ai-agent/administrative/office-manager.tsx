import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-office-manager',
    uid: 'ktx-13-office-manager',
    name: 'AI Office Manager',
    title: 'AI Office Manager',
    description: 'AI Office Manager manages team operations and ensures delivery excellence for the Administrative department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Scheduling', 'Office Management', 'Records Keeping', 'Communication Coordination', 'Travel Planning'],
    color: '#795548',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '94% efficiency',
    replacesRole: 'AI Office Manager',
    subAgents: [
      { id: 'ai-vendor-manager', uid: 'ktx-13-vendor-manager', name: 'AI Vendor Manager', title: 'AI Vendor Manager', route: '/ai-agent/administrative/vendor-manager' },
      { id: 'ai-supply-orderer', uid: 'ktx-13-supply-orderer', name: 'AI Supply Orderer', title: 'AI Supply Orderer', route: '/ai-agent/administrative/supply-orderer' },
      { id: 'ai-expense-reporter', uid: 'ktx-13-expense-reporter', name: 'AI Expense Reporter', title: 'AI Expense Reporter', route: '/ai-agent/administrative/expense-reporter' }
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
      department: 'Administrative',
      level: 'manager',
      departmentId: 13,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
