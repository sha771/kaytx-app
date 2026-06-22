import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-data-catalog-curator',
    uid: 'ktx-08-data-catalog-curator',
    name: 'AI AI Data Catalog Curator',
    title: 'AI Data Catalog Curator',
    description: 'AI AI Data Catalog Curator provides specialized expertise and executes critical tasks for the Legal & Compliance department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Audit Management', 'Contract Management', 'Regulatory Compliance', 'Risk Assessment', 'Legal Research'],
    color: '#3F51B5',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '76% efficiency',
    replacesRole: 'AI Data Catalog Curator',
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
      department: 'Legal & Compliance',
      level: 'specialist',
      departmentId: 8,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
