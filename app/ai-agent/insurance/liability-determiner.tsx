import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-liability-determiner',
    uid: 'ktx-16-liability-determiner',
    name: 'AI Liability Determiner',
    title: 'AI Liability Determiner',
    description: 'AI Liability Determiner provides specialized expertise and executes critical tasks for the Insurance & Risk department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Customer Communication', 'Claims Processing', 'Underwriting', 'Policy Management', 'Risk Assessment'],
    color: '#FF7043',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '76% efficiency',
    replacesRole: 'AI Liability Determiner',
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4047',
      tasksAutomatedDaily: 491,
      responseTime: '2.1s',
      accuracyRate: '99.3%',
    },
    hierarchy: {
      department: 'Insurance & Risk',
      level: 'specialist',
      departmentId: 16,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
