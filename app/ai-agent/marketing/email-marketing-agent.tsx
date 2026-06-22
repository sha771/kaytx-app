import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-email-marketing-agent',
    uid: 'ktx-03-email-marketing-agent',
    name: 'AI Email Marketing Agent',
    title: 'AI Email Marketing Agent',
    description: 'AI Email Marketing Agent coordinates team activities and ensures quality output for the Marketing & Growth department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Campaign Management', 'SEO Optimization', 'Content Strategy', 'Social Media Analytics', 'Brand Management'],
    color: '#E91E63',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '83% efficiency',
    replacesRole: 'AI Email Marketing Agent',
    subAgents: [
      { id: 'ai-funnel-analyzer', uid: 'ktx-03-funnel-analyzer', name: 'AI Funnel Analyzer', title: 'AI Funnel Analyzer', route: '/ai-agent/marketing/funnel-analyzer' },
      { id: 'ai-on-page-optimizer', uid: 'ktx-03-on-page-optimizer', name: 'AI On-page Optimizer', title: 'AI On-page Optimizer', route: '/ai-agent/marketing/on-page-optimizer' },
      { id: 'ai-brand-health-surveyor', uid: 'ktx-03-brand-health-surveyor', name: 'AI Brand Health Surveyor', title: 'AI Brand Health Surveyor', route: '/ai-agent/marketing/brand-health-surveyor' }
    ],
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4136',
      tasksAutomatedDaily: 108,
      responseTime: '2.2s',
      accuracyRate: '94.0%',
    },
    hierarchy: {
      department: 'Marketing & Growth',
      level: 'team_lead',
      departmentId: 3,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
