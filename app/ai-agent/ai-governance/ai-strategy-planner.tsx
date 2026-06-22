import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-strategy-planner',
    uid: 'ktx-22-ai-strategy-planner',
    name: 'AI Strategy Planner',
    title: 'AI Strategy Planner',
    description: 'AI Strategy Planner develops comprehensive AI governance strategies aligned with organizational objectives. This AI agent creates strategic roadmaps, defines governance priorities, and ensures long-term governance vision.',
    capabilities: ['Strategic Planning', 'Roadmap Development', 'Priority Definition', 'Vision Setting', 'Strategic Alignment'],
    color: '#6366F1',
    type: 'agent' as const,
    humanCost: '$115k/year',
    aiCost: '$2,050/mo',
    efficiency: '94% efficiency',
    replacesRole: 'AI Strategy Planner',
    subAgents: [
      { id: 'ai-governance-strategy', uid: 'ktx-22-governance-strategy', name: 'AI Governance Strategy', title: 'AI Governance Strategy', route: '/ai-agent/ai-governance/governance-strategy' }
    ],
    infrastructure: {
      status: 'online',
      health: 96,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$7417',
      tasksAutomatedDaily: 362,
      responseTime: '1.3s',
      accuracyRate: '97.8%',
    },
    hierarchy: {
      department: 'AI Management & Governance',
      level: 'vp_director',
      departmentId: 22,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
