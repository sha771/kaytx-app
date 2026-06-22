import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-treasury',
    uid: 'ktx-05-vp-treasury',
    name: 'AI VP Treasury',
    title: 'AI VP Treasury',
    description: 'AI VP Treasury drives department strategy and oversees operations for the Finance & Accounting department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Cash Flow Analysis', 'Financial Reporting', 'Financial Modeling', 'Budget Management', 'Tax Compliance'],
    color: '#2E7D32',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$1,800/mo',
    efficiency: '93% efficiency',
    replacesRole: 'AI VP Treasury',
    subAgents: [
      { id: 'ai-financial-modeler', uid: 'ktx-05-financial-modeler', name: 'AI Financial Modeler', title: 'AI Financial Modeler', route: '/ai-agent/finance/financial-modeler' },
      { id: 'ai-variance-analyzer', uid: 'ktx-05-variance-analyzer', name: 'AI Variance Analyzer', title: 'AI Variance Analyzer', route: '/ai-agent/finance/variance-analyzer' },
      { id: 'ai-forecast-adjuster', uid: 'ktx-05-forecast-adjuster', name: 'AI Forecast Adjuster', title: 'AI Forecast Adjuster', route: '/ai-agent/finance/forecast-adjuster' }
    ],
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.0%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$9918',
      tasksAutomatedDaily: 822,
      responseTime: '1.5s',
      accuracyRate: '97.2%',
    },
    hierarchy: {
      department: 'Finance & Accounting',
      level: 'vp_director',
      departmentId: 5,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
