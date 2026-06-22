import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-penetration-tester',
    uid: 'ktx-11-penetration-tester',
    name: 'AI Penetration Tester',
    title: 'AI Penetration Tester',
    description: 'AI Penetration Tester coordinates team activities and ensures quality output for the Security & Risk department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Encryption Management', 'Compliance Monitoring', 'Risk Mitigation', 'Threat Detection', 'Vulnerability Assessment'],
    color: '#F44336',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '82% efficiency',
    replacesRole: 'AI Penetration Tester',
    subAgents: [
      { id: 'ai-policy-drafter', uid: 'ktx-11-policy-drafter', name: 'AI Policy Drafter', title: 'AI Policy Drafter', route: '/ai-agent/security/policy-drafter' },
      { id: 'ai-alert-triage-agent', uid: 'ktx-11-alert-triage-agent', name: 'AI Alert Triage Agent', title: 'AI Alert Triage Agent', route: '/ai-agent/security/alert-triage-agent' },
      { id: 'ai-role-modeler', uid: 'ktx-11-role-modeler', name: 'AI Role Modeler', title: 'AI Role Modeler', route: '/ai-agent/security/role-modeler' }
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
      department: 'Security & Risk',
      level: 'team_lead',
      departmentId: 11,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
