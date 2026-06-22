import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-contract-specialist',
    uid: 'ktx-08-contract-specialist',
    name: 'AI Contract Specialist',
    title: 'AI Contract Specialist',
    description: 'AI Contract Specialist coordinates team activities and ensures quality output for the Legal & Compliance department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Policy Development', 'Audit Management', 'Contract Management', 'Regulatory Compliance', 'Risk Assessment'],
    color: '#3F51B5',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '89% efficiency',
    replacesRole: 'AI Contract Specialist',
    subAgents: [
      { id: 'ai-compliance-training-coordinator', uid: 'ktx-08-compliance-training-coordinator', name: 'AI Compliance Training Coordinator', title: 'AI Compliance Training Coordinator', route: '/ai-agent/legal/compliance-training-coordinator' },
      { id: 'ai-audit-scheduler', uid: 'ktx-08-audit-scheduler', name: 'AI Audit Scheduler', title: 'AI Audit Scheduler', route: '/ai-agent/legal/audit-scheduler' },
      { id: 'ai-gap-assessor', uid: 'ktx-08-gap-assessor', name: 'AI Gap Assessor', title: 'AI Gap Assessor', route: '/ai-agent/legal/gap-assessor' }
    ],
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.2%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3958',
      tasksAutomatedDaily: 474,
      responseTime: '2.0s',
      accuracyRate: '99.1%',
    },
    hierarchy: {
      department: 'Legal & Compliance',
      level: 'team_lead',
      departmentId: 8,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
