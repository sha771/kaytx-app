import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-sales',
    uid: 'ktx-02-vp-sales',
    name: 'AI VP Sales',
    title: 'AI VP Sales',
    description: 'AI VP Sales drives department strategy and oversees operations for the Sales & Revenue department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['CRM Integration', 'Deal Tracking', 'Revenue Optimization', 'Territory Management', 'Sales Coaching'],
    color: '#FFA000',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$1,800/mo',
    efficiency: '92% efficiency',
    replacesRole: 'AI VP Sales',
    subAgents: [
      { id: 'ai-pipeline-analyst', uid: 'ktx-02-pipeline-analyst', name: 'AI Pipeline Analyst', title: 'AI Pipeline Analyst', route: '/ai-agent/sales/pipeline-analyst' },
      { id: 'ai-reporting-automator', uid: 'ktx-02-reporting-automator', name: 'AI Reporting Automator', title: 'AI Reporting Automator', route: '/ai-agent/sales/reporting-automator' },
      { id: 'ai-pricing-calculator', uid: 'ktx-02-pricing-calculator', name: 'AI Pricing Calculator', title: 'AI Pricing Calculator', route: '/ai-agent/sales/pricing-calculator' }
    ],
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$9507',
      tasksAutomatedDaily: 753,
      responseTime: '1.3s',
      accuracyRate: '96.5%',
    },
    hierarchy: {
      department: 'Sales & Revenue',
      level: 'vp_director',
      departmentId: 2,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
