import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-exception-approver',
    uid: 'ktx-16-exception-approver',
    name: 'AI Exception Approver',
    title: 'AI Exception Approver',
    description: 'AI Exception Approver provides specialized expertise and executes critical tasks for the Insurance & Risk department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Premium Calculation', 'Regulatory Compliance', 'Customer Communication', 'Claims Processing', 'Underwriting'],
    color: '#FF7043',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '82% efficiency',
    replacesRole: 'AI Exception Approver',
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.0%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3869',
      tasksAutomatedDaily: 457,
      responseTime: '2.0s',
      accuracyRate: '98.8%',
    },
    hierarchy: {
      department: 'Insurance & Risk',
      level: 'specialist',
      departmentId: 16,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
