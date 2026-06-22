import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-sales-rep',
    uid: 'ktx-02-sales-rep',
    name: 'AI Sales Rep',
    title: 'AI Sales Rep',
    description: 'AI Sales Rep coordinates team activities and ensures quality output for the Sales & Revenue department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Deal Tracking', 'Revenue Optimization', 'Territory Management', 'Sales Coaching', 'Lead Scoring'],
    color: '#FFA000',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '79% efficiency',
    replacesRole: 'AI Sales Rep',
    subAgents: [
      { id: 'ai-partnership-scout', uid: 'ktx-02-partnership-scout', name: 'AI Partnership Scout', title: 'AI Partnership Scout', route: '/ai-agent/sales/partnership-scout' },
      { id: 'ai-objection-handler', uid: 'ktx-02-objection-handler', name: 'AI Objection Handler', title: 'AI Objection Handler', route: '/ai-agent/sales/objection-handler' },
      { id: 'ai-margin-calculator', uid: 'ktx-02-margin-calculator', name: 'AI Margin Calculator', title: 'AI Margin Calculator', route: '/ai-agent/sales/margin-calculator' }
    ],
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3068',
      tasksAutomatedDaily: 304,
      responseTime: '1.3s',
      accuracyRate: '96.8%',
    },
    hierarchy: {
      department: 'Sales & Revenue',
      level: 'team_lead',
      departmentId: 2,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
