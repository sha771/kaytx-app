import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-treasury-analyst',
    uid: 'ktx-05-treasury-analyst',
    name: 'AI Treasury Analyst',
    title: 'AI Treasury Analyst',
    description: 'AI Treasury Analyst coordinates team activities and ensures quality output for the Finance & Accounting department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Revenue Recognition', 'Expense Tracking', 'Audit Preparation', 'Cash Flow Analysis', 'Financial Reporting'],
    color: '#2E7D32',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '88% efficiency',
    replacesRole: 'AI Treasury Analyst',
    subAgents: [
      { id: 'ai-earnings-report-drafter', uid: 'ktx-05-earnings-report-drafter', name: 'AI Earnings Report Drafter', title: 'AI Earnings Report Drafter', route: '/ai-agent/finance/earnings-report-drafter' },
      { id: 'ai-trend-projector', uid: 'ktx-05-trend-projector', name: 'AI Trend Projector', title: 'AI Trend Projector', route: '/ai-agent/finance/trend-projector' },
      { id: 'ai-debt-schedule-manager', uid: 'ktx-05-debt-schedule-manager', name: 'AI Debt Schedule Manager', title: 'AI Debt Schedule Manager', route: '/ai-agent/finance/debt-schedule-manager' }
    ],
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3691',
      tasksAutomatedDaily: 423,
      responseTime: '1.8s',
      accuracyRate: '98.4%',
    },
    hierarchy: {
      department: 'Finance & Accounting',
      level: 'team_lead',
      departmentId: 5,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
