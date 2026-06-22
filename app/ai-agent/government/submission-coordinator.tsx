import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-submission-coordinator',
    uid: 'ktx-20-submission-coordinator',
    name: 'AI Submission Coordinator',
    title: 'AI Submission Coordinator',
    description: 'AI Submission Coordinator leads strategic direction and executive decision-making for the Government & Public Sector department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Public Engagement', 'Regulatory Development', 'Grant Management', 'Program Evaluation', 'Stakeholder Relations'],
    color: '#78909C',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '90% efficiency',
    replacesRole: 'AI Submission Coordinator',
    infrastructure: {
      status: 'online',
      health: 85,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11425',
      tasksAutomatedDaily: 575,
      responseTime: '2.3s',
      accuracyRate: '94.3%',
    },
    hierarchy: {
      department: 'Government & Public Sector',
      level: 'c_level',
      departmentId: 20,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
