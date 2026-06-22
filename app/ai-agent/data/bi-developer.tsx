import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-bi-developer',
    uid: 'ktx-09-bi-developer',
    name: 'AI BI Developer',
    title: 'AI BI Developer',
    description: 'AI BI Developer coordinates team activities and ensures quality output for the Data & Intelligence department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Big Data Processing', 'Data Pipeline Management', 'Machine Learning', 'Data Governance', 'ETL Processing'],
    color: '#00ACC1',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '80% efficiency',
    replacesRole: 'AI BI Developer',
    subAgents: [
      { id: 'ai-analytics-roadmap-planner', uid: 'ktx-09-analytics-roadmap-planner', name: 'AI Analytics Roadmap Planner', title: 'AI Analytics Roadmap Planner', route: '/ai-agent/data/analytics-roadmap-planner' },
      { id: 'ai-experiment-designer', uid: 'ktx-09-experiment-designer', name: 'AI Experiment Designer', title: 'AI Experiment Designer', route: '/ai-agent/data/experiment-designer' },
      { id: 'ai-issue-resolver', uid: 'ktx-09-issue-resolver', name: 'AI Issue Resolver', title: 'AI Issue Resolver', route: '/ai-agent/data/issue-resolver' }
    ],
    infrastructure: {
      status: 'online',
      health: 85,
      uptime: '99.2%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3335',
      tasksAutomatedDaily: 355,
      responseTime: '1.6s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Data & Intelligence',
      level: 'team_lead',
      departmentId: 9,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
