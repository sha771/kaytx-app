import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-underwriting-manager',
    uid: 'ktx-16-underwriting-manager',
    name: 'AI Underwriting Manager',
    title: 'AI Underwriting Manager',
    description: 'AI Underwriting Manager manages team operations and ensures delivery excellence for the Insurance & Risk department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Customer Communication', 'Claims Processing', 'Underwriting', 'Policy Management', 'Risk Assessment'],
    color: '#FF7043',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '76% efficiency',
    replacesRole: 'AI Underwriting Manager',
    subAgents: [
      { id: 'ai-portfolio-mix-manager', uid: 'ktx-16-portfolio-mix-manager', name: 'AI Portfolio Mix Manager', title: 'AI Portfolio Mix Manager', route: '/ai-agent/insurance/portfolio-mix-manager' },
      { id: 'ai-endorsement-processor', uid: 'ktx-16-endorsement-processor', name: 'AI Endorsement Processor', title: 'AI Endorsement Processor', route: '/ai-agent/insurance/endorsement-processor' },
      { id: 'ai-policy-issuer', uid: 'ktx-16-policy-issuer', name: 'AI Policy Issuer', title: 'AI Policy Issuer', route: '/ai-agent/insurance/policy-issuer' }
    ],
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
      department: 'Insurance & Risk',
      level: 'manager',
      departmentId: 16,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
