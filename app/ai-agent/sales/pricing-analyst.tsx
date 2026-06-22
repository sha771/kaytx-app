import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-pricing-analyst',
    uid: 'ktx-02-pricing-analyst',
    name: 'AI Pricing Analyst',
    title: 'AI Pricing Analyst',
    description: 'AI Pricing Analyst coordinates team activities and ensures quality output for the Sales & Revenue department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Sales Forecasting', 'CRM Integration', 'Deal Tracking', 'Revenue Optimization', 'Territory Management'],
    color: '#FFA000',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '81% efficiency',
    replacesRole: 'AI Pricing Analyst',
    subAgents: [
      { id: 'ai-co-marketing-coordinator', uid: 'ktx-02-co-marketing-coordinator', name: 'AI Co-marketing Coordinator', title: 'AI Co-marketing Coordinator', route: '/ai-agent/sales/co-marketing-coordinator' },
      { id: 'ai-activity-logger', uid: 'ktx-02-activity-logger', name: 'AI Activity Logger', title: 'AI Activity Logger', route: '/ai-agent/sales/activity-logger' },
      { id: 'ai-content-recommender', uid: 'ktx-02-content-recommender', name: 'AI Content Recommender', title: 'AI Content Recommender', route: '/ai-agent/sales/content-recommender' }
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
