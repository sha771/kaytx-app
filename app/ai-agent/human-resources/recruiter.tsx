import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-recruiter',
    uid: 'ktx-07-recruiter',
    name: 'AI Recruiter',
    title: 'AI Recruiter',
    description: 'AI Recruiter coordinates team activities and ensures quality output for the Human Resources department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Compensation Analysis', 'Culture Development', 'HR Compliance', 'Workforce Planning', 'Talent Acquisition'],
    color: '#9C27B0',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '79% efficiency',
    replacesRole: 'AI Recruiter',
    subAgents: [
      { id: 'ai-hr-compliance-tracker', uid: 'ktx-07-hr-compliance-tracker', name: 'AI HR Compliance Tracker', title: 'AI HR Compliance Tracker', route: '/ai-agent/human-resources/hr-compliance-tracker' },
      { id: 'ai-requisition-prioritizer', uid: 'ktx-07-requisition-prioritizer', name: 'AI Requisition Prioritizer', title: 'AI Requisition Prioritizer', route: '/ai-agent/human-resources/requisition-prioritizer' },
      { id: 'ai-mentorship-matcher', uid: 'ktx-07-mentorship-matcher', name: 'AI Mentorship Matcher', title: 'AI Mentorship Matcher', route: '/ai-agent/human-resources/mentorship-matcher' }
    ],
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3068',
      tasksAutomatedDaily: 304,
      responseTime: '1.3s',
      accuracyRate: '96.8%',
    },
    hierarchy: {
      department: 'Human Resources',
      level: 'team_lead',
      departmentId: 7,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
