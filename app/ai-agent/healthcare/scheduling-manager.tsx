import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-scheduling-manager',
    uid: 'ktx-17-scheduling-manager',
    name: 'AI Scheduling Manager',
    title: 'AI Scheduling Manager',
    description: 'AI Scheduling Manager manages team operations and ensures delivery excellence for the Healthcare & Medical department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Telemedicine', 'Medical Billing', 'Healthcare Compliance', 'Patient Care Coordination', 'Medical Records Management'],
    color: '#EC407A',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '82% efficiency',
    replacesRole: 'AI Scheduling Manager',
    subAgents: [
      { id: 'ai-regulatory-compliance-monitor', uid: 'ktx-17-regulatory-compliance-monitor', name: 'AI Regulatory Compliance Monitor', title: 'AI Regulatory Compliance Monitor', route: '/ai-agent/healthcare/regulatory-compliance-monitor' },
      { id: 'ai-pre-authorization-agent', uid: 'ktx-17-pre-authorization-agent', name: 'AI Pre-authorization Agent', title: 'AI Pre-authorization Agent', route: '/ai-agent/healthcare/pre-authorization-agent' },
      { id: 'ai-virtual-visit-facilitator', uid: 'ktx-17-virtual-visit-facilitator', name: 'AI Virtual Visit Facilitator', title: 'AI Virtual Visit Facilitator', route: '/ai-agent/healthcare/virtual-visit-facilitator' }
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
      level: 'manager',
      departmentId: 17,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
