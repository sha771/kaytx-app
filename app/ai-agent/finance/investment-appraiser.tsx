import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-investment-appraiser',
    uid: 'ktx-05-investment-appraiser',
    name: 'AI Investment Appraiser',
    title: 'AI Investment Appraiser',
    description: 'AI Investment Appraiser provides specialized expertise and executes critical tasks for the Finance & Accounting department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Financial Reporting', 'Financial Modeling', 'Budget Management', 'Tax Compliance', 'Revenue Recognition'],
    color: '#2E7D32',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '76% efficiency',
    replacesRole: 'AI Investment Appraiser',
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
      department: 'Finance & Accounting',
      level: 'specialist',
      departmentId: 5,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
