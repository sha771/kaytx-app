import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-consent-manager',
    uid: 'ktx-11-consent-manager',
    name: 'AI Consent Manager',
    title: 'AI Consent Manager',
    description: 'AI Consent Manager manages team operations and ensures delivery excellence for the Security & Risk department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Incident Response', 'Security Auditing', 'Access Control', 'Encryption Management', 'Compliance Monitoring'],
    color: '#F44336',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '81% efficiency',
    replacesRole: 'AI Consent Manager',
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3602',
      tasksAutomatedDaily: 406,
      responseTime: '1.8s',
      accuracyRate: '98.1%',
    },
    hierarchy: {
      department: 'Security & Risk',
      level: 'manager',
      departmentId: 11,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
