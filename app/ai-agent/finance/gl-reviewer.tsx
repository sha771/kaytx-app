import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-gl-reviewer',
    uid: 'ktx-05-gl-reviewer',
    name: 'AI GL Reviewer',
    title: 'AI GL Reviewer',
    description: 'AI GL Reviewer provides specialized expertise and executes critical tasks for the Finance & Accounting department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Cash Flow Analysis', 'Financial Reporting', 'Financial Modeling', 'Budget Management', 'Tax Compliance'],
    color: '#2E7D32',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '93% efficiency',
    replacesRole: 'AI GL Reviewer',
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
      department: 'Finance & Accounting',
      level: 'specialist',
      departmentId: 5,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
