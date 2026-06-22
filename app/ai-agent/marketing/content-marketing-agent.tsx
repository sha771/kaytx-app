import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-content-marketing-agent',
    uid: 'ktx-03-content-marketing-agent',
    name: 'AI Content Marketing Agent',
    title: 'AI Content Marketing Agent',
    description: 'AI Content Marketing Agent coordinates team activities and ensures quality output for the Marketing & Growth department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Content Strategy', 'Social Media Analytics', 'Brand Management', 'Growth Hacking', 'A/B Testing'],
    color: '#E91E63',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '77% efficiency',
    replacesRole: 'AI Content Marketing Agent',
    subAgents: [
      { id: 'ai-brand-guidelines-enforcer', uid: 'ktx-03-brand-guidelines-enforcer', name: 'AI Brand Guidelines Enforcer', title: 'AI Brand Guidelines Enforcer', route: '/ai-agent/marketing/brand-guidelines-enforcer' },
      { id: 'ai-copy-editor', uid: 'ktx-03-copy-editor', name: 'AI Copy Editor', title: 'AI Copy Editor', route: '/ai-agent/marketing/copy-editor' },
      { id: 'ai-kpi-dashboard-builder', uid: 'ktx-03-kpi-dashboard-builder', name: 'AI KPI Dashboard Builder', title: 'AI KPI Dashboard Builder', route: '/ai-agent/marketing/kpi-dashboard-builder' }
    ],
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4314',
      tasksAutomatedDaily: 142,
      responseTime: '2.3s',
      accuracyRate: '94.5%',
    },
    hierarchy: {
      department: 'Marketing & Growth',
      level: 'team_lead',
      departmentId: 3,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
