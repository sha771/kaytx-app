import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-enterprise-architect',
    uid: 'ktx-06-enterprise-architect',
    name: 'AI Enterprise Architect',
    title: 'AI Enterprise Architect',
    description: 'AI Enterprise Architect designs and oversees enterprise-wide technology architecture. This AI agent automates architecture planning, ensures system integration, and collaborates with other agents to create scalable and efficient technology solutions.',
    capabilities: ['Enterprise Architecture', 'System Integration', 'Architecture Governance', 'Technology Standards', 'Solution Design'],
    color: '#1565C0',
    type: 'agent' as const,
    humanCost: '$130k/year',
    aiCost: '$2,600/mo',
    efficiency: '90% efficiency',
    replacesRole: 'Enterprise Architect',
    subAgents: [],
    infrastructure: {
      status: 'online',
      health: 93,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$10699',
      tasksAutomatedDaily: 598,
      responseTime: '1.5s',
      accuracyRate: '96.1%',
    },
    hierarchy: {
      department: 'Technology & Engineering',
      level: 'manager',
      departmentId: 6,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
