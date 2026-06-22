import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-repurposing-strategist',
    uid: 'ktx-03-repurposing-strategist',
    name: 'AI Repurposing Strategist',
    title: 'AI Repurposing Strategist',
    description: 'AI Repurposing Strategist provides specialized expertise and executes critical tasks for the Marketing & Growth department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['SEO Optimization', 'Content Strategy', 'Social Media Analytics', 'Brand Management', 'Growth Hacking'],
    color: '#E91E63',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '90% efficiency',
    replacesRole: 'AI Repurposing Strategist',
    infrastructure: {
      status: 'online',
      health: 85,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4225',
      tasksAutomatedDaily: 125,
      responseTime: '2.3s',
      accuracyRate: '94.3%',
    },
    hierarchy: {
      department: 'Marketing & Growth',
      level: 'specialist',
      departmentId: 3,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
