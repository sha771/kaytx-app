import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-claims-manager',
    uid: 'ktx-16-claims-manager',
    name: 'AI Claims Manager',
    title: 'AI Claims Manager',
    description: 'AI Claims Manager manages team operations and ensures delivery excellence for the Insurance & Risk department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Underwriting', 'Policy Management', 'Risk Assessment', 'Fraud Detection', 'Premium Calculation'],
    color: '#FF7043',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '94% efficiency',
    replacesRole: 'AI Claims Manager',
    subAgents: [
      { id: 'ai-pricing-strategy-advisor', uid: 'ktx-16-pricing-strategy-advisor', name: 'AI Pricing Strategy Advisor', title: 'AI Pricing Strategy Advisor', route: '/ai-agent/insurance/pricing-strategy-advisor' },
      { id: 'ai-risk-evaluator', uid: 'ktx-16-risk-evaluator', name: 'AI Risk Evaluator', title: 'AI Risk Evaluator', route: '/ai-agent/insurance/risk-evaluator' },
      { id: 'ai-document-generator', uid: 'ktx-16-document-generator', name: 'AI Document Generator', title: 'AI Document Generator', route: '/ai-agent/insurance/document-generator' }
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
