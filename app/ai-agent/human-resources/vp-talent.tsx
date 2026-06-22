import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-talent',
    uid: 'ktx-07-vp-talent',
    name: 'AI VP Talent',
    title: 'AI VP Talent',
    description: 'AI VP Talent drives department strategy and oversees operations for the Human Resources department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Compensation Analysis', 'Culture Development', 'HR Compliance', 'Workforce Planning', 'Talent Acquisition'],
    color: '#9C27B0',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$1,800/mo',
    efficiency: '79% efficiency',
    replacesRole: 'AI VP Talent',
    subAgents: [
      { id: 'ai-workforce-planner', uid: 'ktx-07-workforce-planner', name: 'AI Workforce Planner', title: 'AI Workforce Planner', route: '/ai-agent/human-resources/workforce-planner' },
      { id: 'ai-culture-survey-analyst', uid: 'ktx-07-culture-survey-analyst', name: 'AI Culture Survey Analyst', title: 'AI Culture Survey Analyst', route: '/ai-agent/human-resources/culture-survey-analyst' },
      { id: 'ai-reference-checker', uid: 'ktx-07-reference-checker', name: 'AI Reference Checker', title: 'AI Reference Checker', route: '/ai-agent/human-resources/reference-checker' }
    ],
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$9644',
      tasksAutomatedDaily: 776,
      responseTime: '1.3s',
      accuracyRate: '96.8%',
    },
    hierarchy: {
      department: 'Human Resources',
      level: 'vp_director',
      departmentId: 7,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
