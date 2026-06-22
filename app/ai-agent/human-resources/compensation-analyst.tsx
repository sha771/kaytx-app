import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-compensation-analyst',
    uid: 'ktx-07-compensation-analyst',
    name: 'AI Compensation Analyst',
    title: 'AI Compensation Analyst',
    description: 'AI Compensation Analyst coordinates team activities and ensures quality output for the Human Resources department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Workforce Planning', 'Talent Acquisition', 'Employee Onboarding', 'Performance Reviews', 'Training Programs'],
    color: '#9C27B0',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '76% efficiency',
    replacesRole: 'AI Compensation Analyst',
    subAgents: [
      { id: 'ai-skill-gap-analyzer', uid: 'ktx-07-skill-gap-analyzer', name: 'AI Skill Gap Analyzer', title: 'AI Skill Gap Analyzer', route: '/ai-agent/human-resources/skill-gap-analyzer' },
      { id: 'ai-candidate-sourcer', uid: 'ktx-07-candidate-sourcer', name: 'AI Candidate Sourcer', title: 'AI Candidate Sourcer', route: '/ai-agent/human-resources/candidate-sourcer' },
      { id: 'ai-equity-plan-administrator', uid: 'ktx-07-equity-plan-administrator', name: 'AI Equity Plan Administrator', title: 'AI Equity Plan Administrator', route: '/ai-agent/human-resources/equity-plan-administrator' }
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
      department: 'Human Resources',
      level: 'team_lead',
      departmentId: 7,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
