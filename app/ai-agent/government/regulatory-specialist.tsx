import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-regulatory-specialist',
    uid: 'ktx-20-regulatory-specialist',
    name: 'AI Regulatory Specialist',
    title: 'AI Regulatory Specialist',
    description: 'AI Regulatory Specialist coordinates team activities and ensures quality output for the Government & Public Sector department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Policy Analysis', 'Public Engagement', 'Regulatory Development', 'Grant Management', 'Program Evaluation'],
    color: '#78909C',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '83% efficiency',
    replacesRole: 'AI Regulatory Specialist',
    subAgents: [
      { id: 'ai-submission-coordinator', uid: 'ktx-20-submission-coordinator', name: 'AI Submission Coordinator', title: 'AI Submission Coordinator', route: '/ai-agent/government/submission-coordinator' },
      { id: 'ai-benchmark-researcher', uid: 'ktx-20-benchmark-researcher', name: 'AI Benchmark Researcher', title: 'AI Benchmark Researcher', route: '/ai-agent/government/benchmark-researcher' },
      { id: 'ai-reporting-automator', uid: 'ktx-20-reporting-automator', name: 'AI Reporting Automator', title: 'AI Reporting Automator', route: '/ai-agent/government/reporting-automator' }
    ],
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4136',
      tasksAutomatedDaily: 108,
      responseTime: '2.2s',
      accuracyRate: '94.0%',
    },
    hierarchy: {
      department: 'Government & Public Sector',
      level: 'team_lead',
      departmentId: 20,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
