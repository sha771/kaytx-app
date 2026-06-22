import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-underwriting',
    uid: 'ktx-16-vp-underwriting',
    name: 'AI VP Underwriting',
    title: 'AI VP Underwriting',
    description: 'AI VP Underwriting drives department strategy and oversees operations for the Insurance & Risk department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Policy Management', 'Risk Assessment', 'Fraud Detection', 'Premium Calculation', 'Regulatory Compliance'],
    color: '#FF7043',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$1,800/mo',
    efficiency: '81% efficiency',
    replacesRole: 'AI VP Underwriting',
    subAgents: [
      { id: 'ai-risk-appetite-definer', uid: 'ktx-16-risk-appetite-definer', name: 'AI Risk Appetite Definer', title: 'AI Risk Appetite Definer', route: '/ai-agent/insurance/risk-appetite-definer' },
      { id: 'ai-fraud-flag-coordinator', uid: 'ktx-16-fraud-flag-coordinator', name: 'AI Fraud Flag Coordinator', title: 'AI Fraud Flag Coordinator', route: '/ai-agent/insurance/fraud-flag-coordinator' },
      { id: 'ai-scenario-builder', uid: 'ktx-16-scenario-builder', name: 'AI Scenario Builder', title: 'AI Scenario Builder', route: '/ai-agent/insurance/scenario-builder' }
    ],
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$10466',
      tasksAutomatedDaily: 914,
      responseTime: '1.8s',
      accuracyRate: '98.1%',
    },
    hierarchy: {
      department: 'Insurance & Risk',
      level: 'vp_director',
      departmentId: 16,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
