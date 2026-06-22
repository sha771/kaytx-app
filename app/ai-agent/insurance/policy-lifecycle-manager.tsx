import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-policy-lifecycle-manager',
    uid: 'ktx-16-policy-lifecycle-manager',
    name: 'AI Policy Lifecycle Manager',
    title: 'AI Policy Lifecycle Manager',
    description: 'AI Policy Lifecycle Manager manages team operations and ensures delivery excellence for the Insurance & Risk department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Risk Assessment', 'Fraud Detection', 'Premium Calculation', 'Regulatory Compliance', 'Customer Communication'],
    color: '#FF7043',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '84% efficiency',
    replacesRole: 'AI Policy Lifecycle Manager',
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4403',
      tasksAutomatedDaily: 159,
      responseTime: '2.4s',
      accuracyRate: '94.7%',
    },
    hierarchy: {
      department: 'Insurance & Risk',
      level: 'manager',
      departmentId: 16,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
