import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-evidence-collector',
    uid: 'ktx-08-evidence-collector',
    name: 'AI Evidence Collector',
    title: 'AI Evidence Collector',
    description: 'AI Evidence Collector leads strategic direction and executive decision-making for the Legal & Compliance department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Dispute Resolution', 'Policy Development', 'Audit Management', 'Contract Management', 'Regulatory Compliance'],
    color: '#3F51B5',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '82% efficiency',
    replacesRole: 'AI Evidence Collector',
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.0%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$10877',
      tasksAutomatedDaily: 983,
      responseTime: '2.0s',
      accuracyRate: '98.8%',
    },
    hierarchy: {
      department: 'Legal & Compliance',
      level: 'c_level',
      departmentId: 8,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
