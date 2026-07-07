import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-policy-manager',
    uid: 'ktx-20-policy-manager',
    name: 'AI Policy Manager',
    title: 'AI Policy Manager',
    description: 'AI Policy Manager manages team operations and ensures delivery excellence for the Government & Public Sector department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Public Engagement', 'Regulatory Development', 'Grant Management', 'Program Evaluation', 'Stakeholder Relations'],
    color: '#78909C',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '94% efficiency',
    replacesRole: 'AI Policy Manager',
    subAgents: [
      { id: 'ai-stakeholder-mapper', uid: 'ktx-20-stakeholder-mapper', name: 'AI Stakeholder Mapper', title: 'AI Stakeholder Mapper', route: '/ai-agent/government/stakeholder-mapper' },
      { id: 'ai-application-writer', uid: 'ktx-20-application-writer', name: 'AI Application Writer', title: 'AI Application Writer', route: '/ai-agent/government/application-writer' },
      { id: 'ai-performance-reporter', uid: 'ktx-20-performance-reporter', name: 'AI Performance Reporter', title: 'AI Performance Reporter', route: '/ai-agent/government/performance-reporter' }
    ],
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3513',
      tasksAutomatedDaily: 389,
      responseTime: '1.7s',
      accuracyRate: '97.9%',
    },
    hierarchy: {
      department: 'Government & Public Sector',
      level: 'manager',
      departmentId: 20,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
