import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-policy-manager',
    uid: 'ktx-16-policy-manager',
    name: 'AI Policy Manager',
    title: 'AI Policy Manager',
    description: 'AI Policy Manager manages team operations and ensures delivery excellence for the Insurance & Risk department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Underwriting', 'Policy Management', 'Risk Assessment', 'Fraud Detection', 'Premium Calculation'],
    color: '#FF7043',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '94% efficiency',
    replacesRole: 'AI Policy Manager',
    subAgents: [
      { id: 'ai-claims-process-optimizer', uid: 'ktx-16-claims-process-optimizer', name: 'AI Claims Process Optimizer', title: 'AI Claims Process Optimizer', route: '/ai-agent/insurance/claims-process-optimizer' },
      { id: 'ai-premium-calculator', uid: 'ktx-16-premium-calculator', name: 'AI Premium Calculator', title: 'AI Premium Calculator', route: '/ai-agent/insurance/premium-calculator' },
      { id: 'ai-compliance-checker', uid: 'ktx-16-compliance-checker', name: 'AI Compliance Checker', title: 'AI Compliance Checker', route: '/ai-agent/insurance/compliance-checker' }
    ],
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3513',
      tasksAutomatedDaily: 389,
      responseTime: '1.7s',
      accuracyRate: '97.9%',
    },
    hierarchy: {
      department: 'Insurance & Risk',
      level: 'manager',
      departmentId: 16,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
