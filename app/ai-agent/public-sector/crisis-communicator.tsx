import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-crisis-communicator',
    uid: 'ktx-20-crisis-communicator',
    name: 'AI Crisis Communicator',
    title: 'AI Crisis Communicator',
    description: 'AI Crisis Communicator provides specialized expertise and executes critical tasks for the Government & Public Sector department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Public Communications', 'Government Compliance', 'Policy Analysis', 'Public Engagement', 'Regulatory Development'],
    color: '#78909C',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '89% efficiency',
    replacesRole: 'AI Crisis Communicator',
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.2%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3958',
      tasksAutomatedDaily: 474,
      responseTime: '2.0s',
      accuracyRate: '99.1%',
    },
    hierarchy: {
      department: 'Government & Public Sector',
      level: 'specialist',
      departmentId: 20,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
