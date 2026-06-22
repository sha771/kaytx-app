import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-pricing-strategy-advisor',
    uid: 'ktx-16-pricing-strategy-advisor',
    name: 'AI Pricing Strategy Advisor',
    title: 'AI Pricing Strategy Advisor',
    description: 'AI Pricing Strategy Advisor provides specialized expertise and executes critical tasks for the Insurance & Risk department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Risk Assessment', 'Fraud Detection', 'Premium Calculation', 'Regulatory Compliance', 'Customer Communication'],
    color: '#FF7043',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '84% efficiency',
    replacesRole: 'AI Pricing Strategy Advisor',
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
      level: 'specialist',
      departmentId: 16,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
