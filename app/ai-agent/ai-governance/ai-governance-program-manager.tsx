import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-governance-program-manager',
    uid: 'ktx-22-ai-governance-program-manager',
    name: 'AI Governance Program Manager',
    title: 'AI Governance Program Manager',
    description: 'AI Governance Program Manager manages comprehensive governance programs and initiatives. This AI agent coordinates program activities, tracks program progress, and ensures program objectives are met.',
    capabilities: ['Program Management', 'Activity Coordination', 'Progress Tracking', 'Objective Achievement', 'Resource Management'],
    color: '#059669',
    type: 'agent' as const,
    humanCost: '$105k/year',
    aiCost: '$1,700/mo',
    efficiency: '92% efficiency',
    replacesRole: 'AI Governance Program Manager',
    subAgents: [
      { id: 'ai-governance-implementation', uid: 'ktx-22-governance-implementation', name: 'AI Governance Implementation', title: 'AI Governance Implementation', route: '/ai-agent/ai-governance/governance-implementation' },
      { id: 'ai-governance-operations', uid: 'ktx-22-governance-operations', name: 'AI Governance Operations', title: 'AI Governance Operations', route: '/ai-agent/ai-governance/governance-operations' }
    ],
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$6583',
      tasksAutomatedDaily: 378,
      responseTime: '1.6s',
      accuracyRate: '97.4%',
    },
    hierarchy: {
      department: 'AI Management & Governance',
      level: 'vp_director',
      departmentId: 22,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
