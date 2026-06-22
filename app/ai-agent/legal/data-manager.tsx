import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-data-manager',
    uid: 'ktx-08-data-manager',
    name: 'AI AI Data Manager',
    title: 'AI Data Manager',
    description: 'AI AI Data Manager manages team operations and ensures delivery excellence for the Legal & Compliance department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Audit Management', 'Contract Management', 'Regulatory Compliance', 'Risk Assessment', 'Legal Research'],
    color: '#3F51B5',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '80% efficiency',
    replacesRole: 'AI Data Manager',
    infrastructure: {
      status: 'online',
      health: 85,
      uptime: '99.2%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3335',
      tasksAutomatedDaily: 355,
      responseTime: '1.6s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Legal & Compliance',
      level: 'manager',
      departmentId: 8,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
