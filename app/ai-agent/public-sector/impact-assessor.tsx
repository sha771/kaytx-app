import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-impact-assessor',
    uid: 'ktx-20-impact-assessor',
    name: 'AI Impact Assessor',
    title: 'AI Impact Assessor',
    description: 'AI Impact Assessor provides specialized expertise and executes critical tasks for the Government & Public Sector department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Regulatory Development', 'Grant Management', 'Program Evaluation', 'Stakeholder Relations', 'Public Communications'],
    color: '#78909C',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '81% efficiency',
    replacesRole: 'AI Impact Assessor',
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3602',
      tasksAutomatedDaily: 406,
      responseTime: '1.8s',
      accuracyRate: '98.1%',
    },
    hierarchy: {
      department: 'Government & Public Sector',
      level: 'specialist',
      departmentId: 20,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
