import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-identity-manager',
    uid: 'ktx-11-identity-manager',
    name: 'AI Identity Manager',
    title: 'AI Identity Manager',
    description: 'AI Identity Manager manages team operations and ensures delivery excellence for the Security & Risk department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Security Auditing', 'Access Control', 'Encryption Management', 'Compliance Monitoring', 'Risk Mitigation'],
    color: '#F44336',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '88% efficiency',
    replacesRole: 'AI Identity Manager',
    subAgents: [
      { id: 'ai-risk-appetite-monitor', uid: 'ktx-11-risk-appetite-monitor', name: 'AI Risk Appetite Monitor', title: 'AI Risk Appetite Monitor', route: '/ai-agent/security/risk-appetite-monitor' },
      { id: 'ai-ioc-collector', uid: 'ktx-11-ioc-collector', name: 'AI IoC Collector', title: 'AI IoC Collector', route: '/ai-agent/security/ioc-collector' },
      { id: 'ai-privilege-escalation-monitor', uid: 'ktx-11-privilege-escalation-monitor', name: 'AI Privilege Escalation Monitor', title: 'AI Privilege Escalation Monitor', route: '/ai-agent/security/privilege-escalation-monitor' }
    ],
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3691',
      tasksAutomatedDaily: 423,
      responseTime: '1.8s',
      accuracyRate: '98.4%',
    },
    hierarchy: {
      department: 'Security & Risk',
      level: 'manager',
      departmentId: 11,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
