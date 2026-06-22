import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-call-router',
    uid: 'ktx-01-call-router',
    name: 'AI Call Router',
    title: 'AI Call Router',
    description: 'AI Call Router provides specialized expertise and executes critical tasks for the Customer Experience department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Knowledge Base Management', 'Customer Feedback Analysis', 'Customer Journey Mapping', 'Sentiment Analysis', 'Multi-channel Support'],
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '93% efficiency',
    replacesRole: 'AI Call Router',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.0%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3246',
      tasksAutomatedDaily: 338,
      responseTime: '1.5s',
      accuracyRate: '97.2%',
    },
    hierarchy: {
      department: 'Customer Experience',
      level: 'specialist',
      departmentId: 1,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
