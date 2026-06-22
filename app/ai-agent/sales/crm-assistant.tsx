import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-crm-assistant',
    uid: 'ktx-02-crm-assistant',
    name: 'AI CRM Assistant',
    title: 'AI CRM Assistant',
    description: 'AI CRM Assistant coordinates team activities and ensures quality output for the Sales & Revenue department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Lead Scoring', 'Pipeline Management', 'Sales Forecasting', 'CRM Integration', 'Deal Tracking'],
    color: '#FFA000',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '87% efficiency',
    replacesRole: 'AI CRM Assistant',
    subAgents: [
      { id: 'ai-alliance-coordinator', uid: 'ktx-02-alliance-coordinator', name: 'AI Alliance Coordinator', title: 'AI Alliance Coordinator', route: '/ai-agent/sales/alliance-coordinator' },
      { id: 'ai-stakeholder-mapper', uid: 'ktx-02-stakeholder-mapper', name: 'AI Stakeholder Mapper', title: 'AI Stakeholder Mapper', route: '/ai-agent/sales/stakeholder-mapper' },
      { id: 'ai-trend-analyzer', uid: 'ktx-02-trend-analyzer', name: 'AI Trend Analyzer', title: 'AI Trend Analyzer', route: '/ai-agent/sales/trend-analyzer' }
    ],
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3424',
      tasksAutomatedDaily: 372,
      responseTime: '1.6s',
      accuracyRate: '97.7%',
    },
    hierarchy: {
      department: 'Sales & Revenue',
      level: 'team_lead',
      departmentId: 2,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
