import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-tax-specialist',
    uid: 'ktx-05-tax-specialist',
    name: 'AI Tax Specialist',
    title: 'AI Tax Specialist',
    description: 'AI Tax Specialist coordinates team activities and ensures quality output for the Finance & Accounting department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Budget Management', 'Tax Compliance', 'Revenue Recognition', 'Expense Tracking', 'Audit Preparation'],
    color: '#2E7D32',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '94% efficiency',
    replacesRole: 'AI Tax Specialist',
    subAgents: [
      { id: 'ai-fx-risk-hedger', uid: 'ktx-05-fx-risk-hedger', name: 'AI FX Risk Hedger', title: 'AI FX Risk Hedger', route: '/ai-agent/finance/fx-risk-hedger' },
      { id: 'ai-month-end-coordinator', uid: 'ktx-05-month-end-coordinator', name: 'AI Month-end Coordinator', title: 'AI Month-end Coordinator', route: '/ai-agent/finance/month-end-coordinator' },
      { id: 'ai-cash-position-monitor', uid: 'ktx-05-cash-position-monitor', name: 'AI Cash Position Monitor', title: 'AI Cash Position Monitor', route: '/ai-agent/finance/cash-position-monitor' }
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
      department: 'Finance & Accounting',
      level: 'team_lead',
      departmentId: 5,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
