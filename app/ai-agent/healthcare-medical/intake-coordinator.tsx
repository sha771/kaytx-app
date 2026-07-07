import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-intake-coordinator',
    uid: 'ktx-17-intake-coordinator',
    name: 'AI Intake Coordinator',
    title: 'AI Intake Coordinator',
    description: 'AI Intake Coordinator leads strategic direction and executive decision-making for the Healthcare & Medical department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Telemedicine', 'Medical Billing', 'Healthcare Compliance', 'Patient Care Coordination', 'Medical Records Management'],
    color: '#EC407A',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '82% efficiency',
    replacesRole: 'AI Intake Coordinator',
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
      department: 'Healthcare & Medical',
      level: 'c_level',
      departmentId: 17,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
