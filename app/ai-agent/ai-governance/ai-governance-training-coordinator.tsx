import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-governance-training-coordinator',
    uid: 'ktx-22-ai-governance-training-coordinator',
    name: 'AI Governance Training Coordinator',
    title: 'AI Governance Training Coordinator',
    description: 'AI Governance Training Coordinator manages governance training programs across the organization. This AI agent develops training content, schedules training sessions, and tracks training completion.',
    capabilities: ['Training Development', 'Session Scheduling', 'Completion Tracking', 'Content Management', 'Assessment'],
    color: '#8B5CF6',
    type: 'agent' as const,
    humanCost: '$75k/year',
    aiCost: '$1,100/mo',
    efficiency: '93% efficiency',
    replacesRole: 'AI Governance Training Coordinator',
    subAgents: [
      { id: 'ai-documentation-specialist', uid: 'ktx-22-documentation-specialist', name: 'AI Documentation Specialist', title: 'AI Documentation Specialist', route: '/ai-agent/ai-governance/documentation-specialist' }
    ],
    infrastructure: {
      status: 'online',
      health: 92,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3916',
      tasksAutomatedDaily: 234,
      responseTime: '1.7s',
      accuracyRate: '97.4%',
    },
    hierarchy: {
      department: 'AI Management & Governance',
      level: 'team_lead',
      departmentId: 22,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
