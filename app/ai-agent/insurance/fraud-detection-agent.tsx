import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-fraud-detection-agent',
    uid: 'ktx-16-fraud-detection-agent',
    name: 'AI Fraud Detection Agent',
    title: 'AI Fraud Detection Agent',
    description: 'AI Fraud Detection Agent coordinates team activities and ensures quality output for the Insurance & Risk department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Claims Processing', 'Underwriting', 'Policy Management', 'Risk Assessment', 'Fraud Detection'],
    color: '#FF7043',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '83% efficiency',
    replacesRole: 'AI Fraud Detection Agent',
    subAgents: [
      { id: 'ai-risk-model-overseer', uid: 'ktx-16-risk-model-overseer', name: 'AI Risk Model Overseer', title: 'AI Risk Model Overseer', route: '/ai-agent/insurance/risk-model-overseer' },
      { id: 'ai-liability-determiner', uid: 'ktx-16-liability-determiner', name: 'AI Liability Determiner', title: 'AI Liability Determiner', route: '/ai-agent/insurance/liability-determiner' },
      { id: 'ai-segmentation-analyst', uid: 'ktx-16-segmentation-analyst', name: 'AI Segmentation Analyst', title: 'AI Segmentation Analyst', route: '/ai-agent/insurance/segmentation-analyst' }
    ],
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4136',
      tasksAutomatedDaily: 108,
      responseTime: '2.2s',
      accuracyRate: '94.0%',
    },
    hierarchy: {
      department: 'Insurance & Risk',
      level: 'team_lead',
      departmentId: 16,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
