import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-capital-allocation-optimizer',
    uid: 'ktx-05-capital-allocation-optimizer',
    name: 'AI Capital Allocation Optimizer',
    title: 'AI Capital Allocation Optimizer',
    description: 'AI Capital Allocation Optimizer provides specialized expertise and executes critical tasks for the Finance & Accounting department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Financial Reporting', 'Financial Modeling', 'Budget Management', 'Tax Compliance', 'Revenue Recognition'],
    color: '#2E7D32',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '92% efficiency',
    replacesRole: 'AI Capital Allocation Optimizer',
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4759',
      tasksAutomatedDaily: 227,
      responseTime: '0.7s',
      accuracyRate: '95.6%',
    },
    hierarchy: {
      department: 'Finance & Accounting',
      level: 'specialist',
      departmentId: 5,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
