import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-balance-collector',
    uid: 'ktx-17-balance-collector',
    name: 'AI Balance Collector',
    title: 'AI Balance Collector',
    description: 'AI Balance Collector leads strategic direction and executive decision-making for the Healthcare & Medical department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Treatment Planning', 'Telemedicine', 'Medical Billing', 'Healthcare Compliance', 'Patient Care Coordination'],
    color: '#EC407A',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '75% efficiency',
    replacesRole: 'AI Balance Collector',
    infrastructure: {
      status: 'online',
      health: 85,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$10740',
      tasksAutomatedDaily: 960,
      responseTime: '1.9s',
      accuracyRate: '98.6%',
    },
    hierarchy: {
      department: 'Healthcare & Medical',
      level: 'c_level',
      departmentId: 17,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
