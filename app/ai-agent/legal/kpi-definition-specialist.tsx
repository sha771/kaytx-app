import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-kpi-definition-specialist',
    uid: 'ktx-08-kpi-definition-specialist',
    name: 'AI AI KPI Definition Specialist',
    title: 'AI KPI Definition Specialist',
    description: 'AI AI KPI Definition Specialist provides specialized expertise and executes critical tasks for the Legal & Compliance department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['IP Protection', 'Dispute Resolution', 'Policy Development', 'Audit Management', 'Contract Management'],
    color: '#3F51B5',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '91% efficiency',
    replacesRole: 'AI KPI Definition Specialist',
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.0%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4492',
      tasksAutomatedDaily: 176,
      responseTime: '2.5s',
      accuracyRate: '94.9%',
    },
    hierarchy: {
      department: 'Legal & Compliance',
      level: 'specialist',
      departmentId: 8,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
