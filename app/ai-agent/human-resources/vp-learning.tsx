import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-learning',
    uid: 'ktx-07-vp-learning',
    name: 'AI VP Learning',
    title: 'AI VP Learning',
    description: 'AI VP Learning drives department strategy and oversees operations for the Human Resources department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['HR Compliance', 'Workforce Planning', 'Talent Acquisition', 'Employee Onboarding', 'Performance Reviews'],
    color: '#9C27B0',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$1,800/mo',
    efficiency: '93% efficiency',
    replacesRole: 'AI VP Learning',
    subAgents: [
      { id: 'ai-talent-pipeline-analyst', uid: 'ktx-07-talent-pipeline-analyst', name: 'AI Talent Pipeline Analyst', title: 'AI Talent Pipeline Analyst', route: '/ai-agent/human-resources/talent-pipeline-analyst' },
      { id: 'ai-values-alignment-checker', uid: 'ktx-07-values-alignment-checker', name: 'AI Values Alignment Checker', title: 'AI Values Alignment Checker', route: '/ai-agent/human-resources/values-alignment-checker' },
      { id: 'ai-policy-update-communicator', uid: 'ktx-07-policy-update-communicator', name: 'AI Policy Update Communicator', title: 'AI Policy Update Communicator', route: '/ai-agent/human-resources/policy-update-communicator' }
    ],
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.0%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$9918',
      tasksAutomatedDaily: 822,
      responseTime: '1.5s',
      accuracyRate: '97.2%',
    },
    hierarchy: {
      department: 'Human Resources',
      level: 'vp_director',
      departmentId: 7,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
