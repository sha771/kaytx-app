import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-social-media-manager',
    uid: 'ktx-03-social-media-manager',
    name: 'AI Social Media Manager',
    title: 'AI Social Media Manager',
    description: 'AI Social Media Manager manages team operations and ensures delivery excellence for the Marketing & Growth department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Marketing Automation', 'Campaign Management', 'SEO Optimization', 'Content Strategy', 'Social Media Analytics'],
    color: '#E91E63',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '76% efficiency',
    replacesRole: 'AI Social Media Manager',
    subAgents: [
      { id: 'ai-experiment-designer', uid: 'ktx-03-experiment-designer', name: 'AI Experiment Designer', title: 'AI Experiment Designer', route: '/ai-agent/marketing/experiment-designer' },
      { id: 'ai-keyword-researcher', uid: 'ktx-03-keyword-researcher', name: 'AI Keyword Researcher', title: 'AI Keyword Researcher', route: '/ai-agent/marketing/keyword-researcher' },
      { id: 'ai-competitor-brand-tracker', uid: 'ktx-03-competitor-brand-tracker', name: 'AI Competitor Brand Tracker', title: 'AI Competitor Brand Tracker', route: '/ai-agent/marketing/competitor-brand-tracker' }
    ],
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4047',
      tasksAutomatedDaily: 491,
      responseTime: '2.1s',
      accuracyRate: '99.3%',
    },
    hierarchy: {
      department: 'Marketing & Growth',
      level: 'manager',
      departmentId: 3,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
