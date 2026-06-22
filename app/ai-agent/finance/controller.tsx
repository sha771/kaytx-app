import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-controller',
    uid: 'ktx-05-controller',
    name: 'AI Controller',
    title: 'AI Controller',
    description: 'AI Controller coordinates team activities and ensures quality output for the Finance & Accounting department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Audit Preparation', 'Cash Flow Analysis', 'Financial Reporting', 'Financial Modeling', 'Budget Management'],
    color: '#2E7D32',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '86% efficiency',
    replacesRole: 'AI Controller',
    subAgents: [
      { id: 'ai-investment-appraiser', uid: 'ktx-05-investment-appraiser', name: 'AI Investment Appraiser', title: 'AI Investment Appraiser', route: '/ai-agent/finance/investment-appraiser' },
      { id: 'ai-budget-tracker', uid: 'ktx-05-budget-tracker', name: 'AI Budget Tracker', title: 'AI Budget Tracker', route: '/ai-agent/finance/budget-tracker' },
      { id: 'ai-return-preparer', uid: 'ktx-05-return-preparer', name: 'AI Return Preparer', title: 'AI Return Preparer', route: '/ai-agent/finance/return-preparer' }
    ],
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3157',
      tasksAutomatedDaily: 321,
      responseTime: '1.4s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Finance & Accounting',
      level: 'team_lead',
      departmentId: 5,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
