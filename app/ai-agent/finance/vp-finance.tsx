import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-finance',
    uid: 'ktx-05-vp-finance',
    name: 'AI VP Finance',
    title: 'AI VP Finance',
    description: 'AI VP Finance drives department strategy and oversees operations for the Finance & Accounting department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Audit Preparation', 'Cash Flow Analysis', 'Financial Reporting', 'Financial Modeling', 'Budget Management'],
    color: '#2E7D32',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$1,800/mo',
    efficiency: '86% efficiency',
    replacesRole: 'AI VP Finance',
    subAgents: [
      { id: 'ai-capital-allocation-optimizer', uid: 'ktx-05-capital-allocation-optimizer', name: 'AI Capital Allocation Optimizer', title: 'AI Capital Allocation Optimizer', route: '/ai-agent/finance/capital-allocation-optimizer' },
      { id: 'ai-market-sentiment-tracker', uid: 'ktx-05-market-sentiment-tracker', name: 'AI Market Sentiment Tracker', title: 'AI Market Sentiment Tracker', route: '/ai-agent/finance/market-sentiment-tracker' },
      { id: 'ai-budget-planner', uid: 'ktx-05-budget-planner', name: 'AI Budget Planner', title: 'AI Budget Planner', route: '/ai-agent/finance/budget-planner' }
    ],
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$9781',
      tasksAutomatedDaily: 799,
      responseTime: '1.4s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Finance & Accounting',
      level: 'vp_director',
      departmentId: 5,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
