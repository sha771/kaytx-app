import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-billing-specialist',
    uid: 'ktx-17-billing-specialist',
    name: 'AI Billing Specialist',
    title: 'AI Billing Specialist',
    description: 'AI Billing Specialist coordinates team activities and ensures quality output for the Healthcare & Medical department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Telemedicine', 'Medical Billing', 'Healthcare Compliance', 'Patient Care Coordination', 'Medical Records Management'],
    color: '#EC407A',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '82% efficiency',
    replacesRole: 'AI Billing Specialist',
    subAgents: [
      { id: 'ai-feedback-coordinator', uid: 'ktx-17-feedback-coordinator', name: 'AI Feedback Coordinator', title: 'AI Feedback Coordinator', route: '/ai-agent/healthcare/feedback-coordinator' },
      { id: 'ai-coding-compliance-auditor', uid: 'ktx-17-coding-compliance-auditor', name: 'AI Coding Compliance Auditor', title: 'AI Coding Compliance Auditor', route: '/ai-agent/healthcare/coding-compliance-auditor' },
      { id: 'ai-regulation-tracker', uid: 'ktx-17-regulation-tracker', name: 'AI Regulation Tracker', title: 'AI Regulation Tracker', route: '/ai-agent/healthcare/regulation-tracker' }
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
