import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-inter-agency-coordinator',
    uid: 'ktx-20-inter-agency-coordinator',
    name: 'AI Inter-agency Coordinator',
    title: 'AI Inter-agency Coordinator',
    description: 'AI Inter-agency Coordinator leads strategic direction and executive decision-making for the Government & Public Sector department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Grant Management', 'Program Evaluation', 'Stakeholder Relations', 'Public Communications', 'Government Compliance'],
    color: '#78909C',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '84% efficiency',
    replacesRole: 'AI Inter-agency Coordinator',
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11699',
      tasksAutomatedDaily: 621,
      responseTime: '2.4s',
      accuracyRate: '94.7%',
    },
    hierarchy: {
      department: 'Government & Public Sector',
      level: 'c_level',
      departmentId: 20,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
