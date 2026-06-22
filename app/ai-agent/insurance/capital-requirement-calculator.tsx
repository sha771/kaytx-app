import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-capital-requirement-calculator',
    uid: 'ktx-16-capital-requirement-calculator',
    name: 'AI Capital Requirement Calculator',
    title: 'AI Capital Requirement Calculator',
    description: 'AI Capital Requirement Calculator provides specialized expertise and executes critical tasks for the Insurance & Risk department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Underwriting', 'Policy Management', 'Risk Assessment', 'Fraud Detection', 'Premium Calculation'],
    color: '#FF7043',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '86% efficiency',
    replacesRole: 'AI Capital Requirement Calculator',
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4937',
      tasksAutomatedDaily: 261,
      responseTime: '0.8s',
      accuracyRate: '96.1%',
    },
    hierarchy: {
      department: 'Insurance & Risk',
      level: 'specialist',
      departmentId: 16,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
