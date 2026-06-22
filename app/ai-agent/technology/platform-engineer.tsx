import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-platform-engineer',
    uid: 'ktx-06-platform-engineer',
    name: 'AI Platform Engineer',
    title: 'AI Platform Engineer',
    description: 'AI Platform Engineer builds and maintains internal developer platforms and tooling, enabling teams to deploy and manage applications efficiently through self-service capabilities and automated workflows.',
    capabilities: ['Platform Development', 'Tooling Automation', 'Service Catalog', 'Developer Experience', 'Platform Operations'],
    color: '#00838F',
    type: 'agent' as const,
    humanCost: '$105k/year',
    aiCost: '$1,300/mo',
    efficiency: '90% efficiency',
    replacesRole: 'Platform Engineer',
    infrastructure: {
      status: 'online',
      health: 96,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$7250',
      tasksAutomatedDaily: 282,
      responseTime: '2.1s',
      accuracyRate: '95.5%',
    },
    hierarchy: {
      department: 'Technology & Engineering',
      level: 'team_lead',
      departmentId: 6,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
