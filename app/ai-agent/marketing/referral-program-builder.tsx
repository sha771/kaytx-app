import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-referral-program-builder',
    uid: 'ktx-03-referral-program-builder',
    name: 'AI Referral Program Builder',
    title: 'AI Referral Program Builder',
    description: 'AI Referral Program Builder provides specialized expertise and executes critical tasks for the Marketing & Growth department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Social Media Analytics', 'Brand Management', 'Growth Hacking', 'A/B Testing', 'Marketing Automation'],
    color: '#E91E63',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '84% efficiency',
    replacesRole: 'AI Referral Program Builder',
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
      department: 'Marketing & Growth',
      level: 'specialist',
      departmentId: 3,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
