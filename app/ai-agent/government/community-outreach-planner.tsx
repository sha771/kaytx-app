import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-community-outreach-planner',
    uid: 'ktx-20-community-outreach-planner',
    name: 'AI Community Outreach Planner',
    title: 'AI Community Outreach Planner',
    description: 'AI Community Outreach Planner provides specialized expertise and executes critical tasks for the Government & Public Sector department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Stakeholder Relations', 'Public Communications', 'Government Compliance', 'Policy Analysis', 'Public Engagement'],
    color: '#78909C',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '78% efficiency',
    replacesRole: 'AI Community Outreach Planner',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.2%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4581',
      tasksAutomatedDaily: 193,
      responseTime: '0.5s',
      accuracyRate: '95.2%',
    },
    hierarchy: {
      department: 'Government & Public Sector',
      level: 'specialist',
      departmentId: 20,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
