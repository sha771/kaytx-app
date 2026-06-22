import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-incident-responder',
    uid: 'ktx-11-incident-responder',
    name: 'AI Incident Responder',
    title: 'AI Incident Responder',
    description: 'AI Incident Responder coordinates team activities and ensures quality output for the Security & Risk department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Encryption Management', 'Compliance Monitoring', 'Risk Mitigation', 'Threat Detection', 'Vulnerability Assessment'],
    color: '#F44336',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '82% efficiency',
    replacesRole: 'AI Incident Responder',
    subAgents: [
      { id: 'ai-security-architecture-reviewer', uid: 'ktx-11-security-architecture-reviewer', name: 'AI Security Architecture Reviewer', title: 'AI Security Architecture Reviewer', route: '/ai-agent/security/security-architecture-reviewer' },
      { id: 'ai-escalation-path-definer', uid: 'ktx-11-escalation-path-definer', name: 'AI Escalation Path Definer', title: 'AI Escalation Path Definer', route: '/ai-agent/security/escalation-path-definer' },
      { id: 'ai-remediation-advisor', uid: 'ktx-11-remediation-advisor', name: 'AI Remediation Advisor', title: 'AI Remediation Advisor', route: '/ai-agent/security/remediation-advisor' }
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
