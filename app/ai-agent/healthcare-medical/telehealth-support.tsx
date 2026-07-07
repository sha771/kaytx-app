import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-telehealth-support',
    uid: 'ktx-17-telehealth-support',
    name: 'AI Telehealth Support',
    title: 'AI Telehealth Support',
    description: 'AI Telehealth Support coordinates team activities and ensures quality output for the Healthcare & Medical department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Telemedicine', 'Medical Billing', 'Healthcare Compliance', 'Patient Care Coordination', 'Medical Records Management'],
    color: '#EC407A',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '82% efficiency',
    replacesRole: 'AI Telehealth Support',
    subAgents: [
      { id: 'ai-discharge-planner', uid: 'ktx-17-discharge-planner', name: 'AI Discharge Planner', title: 'AI Discharge Planner', route: '/ai-agent/healthcare/discharge-planner' },
      { id: 'ai-payment-poster', uid: 'ktx-17-payment-poster', name: 'AI Payment Poster', title: 'AI Payment Poster', route: '/ai-agent/healthcare/payment-poster' },
      { id: 'ai-metric-analyzer', uid: 'ktx-17-metric-analyzer', name: 'AI Metric Analyzer', title: 'AI Metric Analyzer', route: '/ai-agent/healthcare/metric-analyzer' }
    ],
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.0%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3869',
      tasksAutomatedDaily: 457,
      responseTime: '2.0s',
      accuracyRate: '98.8%',
    },
    hierarchy: {
      department: 'Healthcare & Medical',
      level: 'team_lead',
      departmentId: 17,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
