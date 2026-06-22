import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-ioc-collector',
    uid: 'ktx-11-ioc-collector',
    name: 'AI IoC Collector',
    title: 'AI IoC Collector',
    description: 'AI IoC Collector leads strategic direction and executive decision-making for the Security & Risk department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Threat Detection', 'Vulnerability Assessment', 'Incident Response', 'Security Auditing', 'Access Control'],
    color: '#F44336',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '87% efficiency',
    replacesRole: 'AI IoC Collector',
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$10192',
      tasksAutomatedDaily: 868,
      responseTime: '1.6s',
      accuracyRate: '97.7%',
    },
    hierarchy: {
      department: 'Security & Risk',
      level: 'c_level',
      departmentId: 11,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
