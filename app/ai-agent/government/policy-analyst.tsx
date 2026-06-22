import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-policy-analyst',
    uid: 'ktx-20-policy-analyst',
    name: 'AI Policy Analyst',
    title: 'AI Policy Analyst',
    description: 'AI Policy Analyst coordinates team activities and ensures quality output for the Government & Public Sector department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Public Engagement', 'Regulatory Development', 'Grant Management', 'Program Evaluation', 'Stakeholder Relations'],
    color: '#78909C',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '94% efficiency',
    replacesRole: 'AI Policy Analyst',
    subAgents: [
      { id: 'ai-regulatory-tracker', uid: 'ktx-20-regulatory-tracker', name: 'AI Regulatory Tracker', title: 'AI Regulatory Tracker', route: '/ai-agent/government/regulatory-tracker' },
      { id: 'ai-data-analyst', uid: 'ktx-20-data-analyst', name: 'AI Data Analyst', title: 'AI Data Analyst', route: '/ai-agent/government/data-analyst' },
      { id: 'ai-ethics-monitor', uid: 'ktx-20-ethics-monitor', name: 'AI Ethics Monitor', title: 'AI Ethics Monitor', route: '/ai-agent/government/ethics-monitor' }
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
      level: 'team_lead',
      departmentId: 20,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
