import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-patent-researcher',
    uid: 'ktx-12-patent-researcher',
    name: 'AI Patent Researcher',
    title: 'AI Patent Researcher',
    description: 'AI Patent Researcher coordinates team activities and ensures quality output for the Research & Development department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Literature Review', 'Experiment Design', 'Innovation Pipeline', 'Technology Scouting', 'Research Methodology'],
    color: '#009688',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '75% efficiency',
    replacesRole: 'AI Patent Researcher',
    subAgents: [
      { id: 'ai-rd-budget-controller', uid: 'ktx-12-rd-budget-controller', name: 'AI R&D Budget Controller', title: 'AI R&D Budget Controller', route: '/ai-agent/research/rd-budget-controller' },
      { id: 'ai-paper-drafter', uid: 'ktx-12-paper-drafter', name: 'AI Paper Drafter', title: 'AI Paper Drafter', route: '/ai-agent/research/paper-drafter' },
      { id: 'ai-filing-tracker', uid: 'ktx-12-filing-tracker', name: 'AI Filing Tracker', title: 'AI Filing Tracker', route: '/ai-agent/research/filing-tracker' }
    ],
    infrastructure: {
      status: 'online',
      health: 85,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3780',
      tasksAutomatedDaily: 440,
      responseTime: '1.9s',
      accuracyRate: '98.6%',
    },
    hierarchy: {
      department: 'Research & Development',
      level: 'team_lead',
      departmentId: 12,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
