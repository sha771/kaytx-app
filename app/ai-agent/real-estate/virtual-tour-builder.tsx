import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-virtual-tour-builder',
    uid: 'ktx-15-virtual-tour-builder',
    name: 'AI Virtual Tour Builder',
    title: 'AI Virtual Tour Builder',
    description: 'AI Virtual Tour Builder provides specialized expertise and executes critical tasks for the Real Estate & Property department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Real Estate Marketing', 'Property Valuation', 'Lease Management', 'Market Analysis', 'Tenant Relations'],
    color: '#8D6E63',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '76% efficiency',
    replacesRole: 'AI Virtual Tour Builder',
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
      department: 'Real Estate & Property',
      level: 'specialist',
      departmentId: 15,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
