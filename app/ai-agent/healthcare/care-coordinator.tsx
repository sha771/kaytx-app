import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-care-coordinator',
    uid: 'ktx-17-care-coordinator',
    name: 'AI Care Coordinator',
    title: 'AI Care Coordinator',
    description: 'AI Care Coordinator leads strategic direction and executive decision-making for the Healthcare & Medical department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Health Monitoring', 'Treatment Planning', 'Telemedicine', 'Medical Billing', 'Healthcare Compliance'],
    color: '#EC407A',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '88% efficiency',
    replacesRole: 'AI Care Coordinator',
    subAgents: [
      { id: 'ai-intake-coordinator', uid: 'ktx-17-intake-coordinator', name: 'AI Intake Coordinator', title: 'AI Intake Coordinator', route: '/ai-agent/healthcare/intake-coordinator' },
      { id: 'ai-coding-update-tracker', uid: 'ktx-17-coding-update-tracker', name: 'AI Coding Update Tracker', title: 'AI Coding Update Tracker', route: '/ai-agent/healthcare/coding-update-tracker' },
      { id: 'ai-audit-preparer', uid: 'ktx-17-audit-preparer', name: 'AI Audit Preparer', title: 'AI Audit Preparer', route: '/ai-agent/healthcare/audit-preparer' }
    ],
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$10603',
      tasksAutomatedDaily: 937,
      responseTime: '1.8s',
      accuracyRate: '98.4%',
    },
    hierarchy: {
      department: 'Healthcare & Medical',
      level: 'c_level',
      departmentId: 17,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
