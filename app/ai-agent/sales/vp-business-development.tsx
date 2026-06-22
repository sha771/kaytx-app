import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-business-development',
    uid: 'ktx-02-vp-business-development',
    name: 'AI VP Business Development',
    title: 'AI VP Business Development',
    description: 'AI VP Business Development drives department strategy and oversees operations for the Sales & Revenue department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Sales Forecasting', 'CRM Integration', 'Deal Tracking', 'Revenue Optimization', 'Territory Management'],
    color: '#FFA000',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$1,800/mo',
    efficiency: '77% efficiency',
    replacesRole: 'AI VP Business Development',
    subAgents: [
      { id: 'ai-territory-planner', uid: 'ktx-02-territory-planner', name: 'AI Territory Planner', title: 'AI Territory Planner', route: '/ai-agent/sales/territory-planner' },
      { id: 'ai-outreach-sequencer', uid: 'ktx-02-outreach-sequencer', name: 'AI Outreach Sequencer', title: 'AI Outreach Sequencer', route: '/ai-agent/sales/outreach-sequencer' },
      { id: 'ai-term-analyzer', uid: 'ktx-02-term-analyzer', name: 'AI Term Analyzer', title: 'AI Term Analyzer', route: '/ai-agent/sales/term-analyzer' }
    ],
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11562',
      tasksAutomatedDaily: 598,
      responseTime: '2.3s',
      accuracyRate: '94.5%',
    },
    hierarchy: {
      department: 'Sales & Revenue',
      level: 'vp_director',
      departmentId: 2,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
