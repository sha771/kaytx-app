import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-communication-strategist',
    uid: 'ktx-20-communication-strategist',
    name: 'AI Communication Strategist',
    title: 'AI Communication Strategist',
    description: 'AI Communication Strategist provides specialized expertise and executes critical tasks for the Government & Public Sector department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Grant Management', 'Program Evaluation', 'Stakeholder Relations', 'Public Communications', 'Government Compliance'],
    color: '#78909C',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '84% efficiency',
    replacesRole: 'AI Communication Strategist',
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4403',
      tasksAutomatedDaily: 159,
      responseTime: '2.4s',
      accuracyRate: '94.7%',
    },
    hierarchy: {
      department: 'Government & Public Sector',
      level: 'specialist',
      departmentId: 20,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
