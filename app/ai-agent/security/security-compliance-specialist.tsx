import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-security-compliance-specialist',
    uid: 'ktx-11-security-compliance-specialist',
    name: 'AI Security Compliance Specialist',
    title: 'AI Security Compliance Specialist',
    description: 'AI Security Compliance Specialist coordinates team activities and ensures quality output for the Security & Risk department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Vulnerability Assessment', 'Incident Response', 'Security Auditing', 'Access Control', 'Encryption Management'],
    color: '#F44336',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '86% efficiency',
    replacesRole: 'AI Security Compliance Specialist',
    subAgents: [
      { id: 'ai-risk-register-manager', uid: 'ktx-11-risk-register-manager', name: 'AI Risk Register Manager', title: 'AI Risk Register Manager', route: '/ai-agent/security/risk-register-manager' },
      { id: 'ai-log-reviewer', uid: 'ktx-11-log-reviewer', name: 'AI Log Reviewer', title: 'AI Log Reviewer', route: '/ai-agent/security/log-reviewer' },
      { id: 'ai-access-reviewer', uid: 'ktx-11-access-reviewer', name: 'AI Access Reviewer', title: 'AI Access Reviewer', route: '/ai-agent/security/access-reviewer' }
    ],
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4937',
      tasksAutomatedDaily: 261,
      responseTime: '0.8s',
      accuracyRate: '96.1%',
    },
    hierarchy: {
      department: 'Security & Risk',
      level: 'team_lead',
      departmentId: 11,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
