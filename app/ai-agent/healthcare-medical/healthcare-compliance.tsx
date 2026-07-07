import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-healthcare-compliance',
    uid: 'ktx-17-healthcare-compliance',
    name: 'AI Healthcare Compliance',
    title: 'AI Healthcare Compliance',
    description: 'AI Healthcare Compliance coordinates team activities and ensures quality output for the Healthcare & Medical department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Patient Care Coordination', 'Medical Records Management', 'Clinical Decision Support', 'Health Monitoring', 'Treatment Planning'],
    color: '#EC407A',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '83% efficiency',
    replacesRole: 'AI Healthcare Compliance',
    subAgents: [
      { id: 'ai-claims-optimizer', uid: 'ktx-17-claims-optimizer', name: 'AI Claims Optimizer', title: 'AI Claims Optimizer', route: '/ai-agent/healthcare/claims-optimizer' },
      { id: 'ai-balance-collector', uid: 'ktx-17-balance-collector', name: 'AI Balance Collector', title: 'AI Balance Collector', route: '/ai-agent/healthcare/balance-collector' },
      { id: 'ai-improvement-planner', uid: 'ktx-17-improvement-planner', name: 'AI Improvement Planner', title: 'AI Improvement Planner', route: '/ai-agent/healthcare/improvement-planner' }
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
      department: 'Healthcare & Medical',
      level: 'team_lead',
      departmentId: 17,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
