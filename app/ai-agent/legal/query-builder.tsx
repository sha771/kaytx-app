import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-query-builder',
    uid: 'ktx-08-query-builder',
    name: 'AI AI Query Builder',
    title: 'AI Query Builder',
    description: 'AI AI Query Builder provides specialized expertise and executes critical tasks for the Legal & Compliance department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Contract Management', 'Regulatory Compliance', 'Risk Assessment', 'Legal Research', 'IP Protection'],
    color: '#3F51B5',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '87% efficiency',
    replacesRole: 'AI Query Builder',
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3424',
      tasksAutomatedDaily: 372,
      responseTime: '1.6s',
      accuracyRate: '97.7%',
    },
    hierarchy: {
      department: 'Legal & Compliance',
      level: 'specialist',
      departmentId: 8,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
