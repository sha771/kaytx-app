import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-care-plan-manager',
    uid: 'ktx-17-care-plan-manager',
    name: 'AI Care Plan Manager',
    title: 'AI Care Plan Manager',
    description: 'AI Care Plan Manager manages team operations and ensures delivery excellence for the Healthcare & Medical department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Treatment Planning', 'Telemedicine', 'Medical Billing', 'Healthcare Compliance', 'Patient Care Coordination'],
    color: '#EC407A',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '75% efficiency',
    replacesRole: 'AI Care Plan Manager',
    infrastructure: {
      status: 'online',
      health: 85,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3780',
      tasksAutomatedDaily: 440,
      responseTime: '1.9s',
      accuracyRate: '98.6%',
    },
    hierarchy: {
      department: 'Healthcare & Medical',
      level: 'manager',
      departmentId: 17,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
