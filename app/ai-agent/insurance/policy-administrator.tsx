import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-policy-administrator',
    uid: 'ktx-16-policy-administrator',
    name: 'AI Policy Administrator',
    title: 'AI Policy Administrator',
    description: 'AI Policy Administrator coordinates team activities and ensures quality output for the Insurance & Risk department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Customer Communication', 'Claims Processing', 'Underwriting', 'Policy Management', 'Risk Assessment'],
    color: '#FF7043',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '76% efficiency',
    replacesRole: 'AI Policy Administrator',
    subAgents: [
      { id: 'ai-workflow-prioritizer', uid: 'ktx-16-workflow-prioritizer', name: 'AI Workflow Prioritizer', title: 'AI Workflow Prioritizer', route: '/ai-agent/insurance/workflow-prioritizer' },
      { id: 'ai-anomaly-scorer', uid: 'ktx-16-anomaly-scorer', name: 'AI Anomaly Scorer', title: 'AI Anomaly Scorer', route: '/ai-agent/insurance/anomaly-scorer' },
      { id: 'ai-loss-estimator', uid: 'ktx-16-loss-estimator', name: 'AI Loss Estimator', title: 'AI Loss Estimator', route: '/ai-agent/insurance/loss-estimator' }
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
      level: 'team_lead',
      departmentId: 16,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
