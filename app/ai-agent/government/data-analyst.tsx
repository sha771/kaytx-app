import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-data-analyst',
    uid: 'ktx-20-data-analyst',
    name: 'AI Data Analyst',
    title: 'AI Data Analyst',
    description: 'AI Data Analyst provides specialized expertise and executes critical tasks for the Government & Public Sector department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Government Compliance', 'Policy Analysis', 'Public Engagement', 'Regulatory Development', 'Grant Management'],
    color: '#78909C',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '80% efficiency',
    replacesRole: 'AI Data Analyst',
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
      department: 'Government & Public Sector',
      level: 'specialist',
      departmentId: 20,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
