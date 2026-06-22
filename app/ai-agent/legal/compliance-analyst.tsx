import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-compliance-analyst',
    uid: 'ktx-08-compliance-analyst',
    name: 'AI Compliance Analyst',
    title: 'AI Compliance Analyst',
    description: 'AI Compliance Analyst coordinates team activities and ensures quality output for the Legal & Compliance department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Dispute Resolution', 'Policy Development', 'Audit Management', 'Contract Management', 'Regulatory Compliance'],
    color: '#3F51B5',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '82% efficiency',
    replacesRole: 'AI Compliance Analyst',
    subAgents: [
      { id: 'ai-contract-lifecycle-manager', uid: 'ktx-08-contract-lifecycle-manager', name: 'AI Contract Lifecycle Manager', title: 'AI Contract Lifecycle Manager', route: '/ai-agent/legal/contract-lifecycle-manager' },
      { id: 'ai-compliance-finding-tracker', uid: 'ktx-08-compliance-finding-tracker', name: 'AI Compliance Finding Tracker', title: 'AI Compliance Finding Tracker', route: '/ai-agent/legal/compliance-finding-tracker' },
      { id: 'ai-evidence-collector', uid: 'ktx-08-evidence-collector', name: 'AI Evidence Collector', title: 'AI Evidence Collector', route: '/ai-agent/legal/evidence-collector' }
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
      department: 'Legal & Compliance',
      level: 'team_lead',
      departmentId: 8,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
