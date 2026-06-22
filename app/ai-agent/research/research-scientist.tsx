import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-research-scientist',
    uid: 'ktx-12-research-scientist',
    name: 'AI Research Scientist',
    title: 'AI Research Scientist',
    description: 'AI Research Scientist coordinates team activities and ensures quality output for the Research & Development department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Experiment Design', 'Innovation Pipeline', 'Technology Scouting', 'Research Methodology', 'Patent Analysis'],
    color: '#009688',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '82% efficiency',
    replacesRole: 'AI Research Scientist',
    subAgents: [
      { id: 'ai-prototype-funder', uid: 'ktx-12-prototype-funder', name: 'AI Prototype Funder', title: 'AI Prototype Funder', route: '/ai-agent/research/prototype-funder' },
      { id: 'ai-ip-filing-coordinator', uid: 'ktx-12-ip-filing-coordinator', name: 'AI IP Filing Coordinator', title: 'AI IP Filing Coordinator', route: '/ai-agent/research/ip-filing-coordinator' },
      { id: 'ai-user-feedback-collector', uid: 'ktx-12-user-feedback-collector', name: 'AI User Feedback Collector', title: 'AI User Feedback Collector', route: '/ai-agent/research/user-feedback-collector' }
    ],
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.0%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3869',
      tasksAutomatedDaily: 457,
      responseTime: '2.0s',
      accuracyRate: '98.8%',
    },
    hierarchy: {
      department: 'Research & Development',
      level: 'team_lead',
      departmentId: 12,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
