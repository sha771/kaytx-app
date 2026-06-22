import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-sales-executive',
    uid: 'ktx-02-sales-executive',
    name: 'AI Sales Executive',
    title: 'AI Sales Executive',
    description: 'AI Sales Executive coordinates team activities and ensures quality output for the Sales & Revenue department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Sales Forecasting', 'CRM Integration', 'Deal Tracking', 'Revenue Optimization', 'Territory Management'],
    color: '#FFA000',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '81% efficiency',
    replacesRole: 'AI Sales Executive',
    subAgents: [
      { id: 'ai-market-expander', uid: 'ktx-02-market-expander', name: 'AI Market Expander', title: 'AI Market Expander', route: '/ai-agent/sales/market-expander' },
      { id: 'ai-deal-structurer', uid: 'ktx-02-deal-structurer', name: 'AI Deal Structurer', title: 'AI Deal Structurer', route: '/ai-agent/sales/deal-structurer' },
      { id: 'ai-discount-approver', uid: 'ktx-02-discount-approver', name: 'AI Discount Approver', title: 'AI Discount Approver', route: '/ai-agent/sales/discount-approver' }
    ],
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3602',
      tasksAutomatedDaily: 406,
      responseTime: '1.8s',
      accuracyRate: '98.1%',
    },
    hierarchy: {
      department: 'Sales & Revenue',
      level: 'team_lead',
      departmentId: 2,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
