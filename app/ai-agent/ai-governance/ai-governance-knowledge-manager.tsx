import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-governance-knowledge-manager',
    uid: 'ktx-22-ai-governance-knowledge-manager',
    name: 'AI Governance Knowledge Manager',
    title: 'AI Governance Knowledge Manager',
    description: 'AI Governance Knowledge Manager maintains the governance knowledge base and expertise repository. This AI agent curates governance knowledge, facilitates knowledge sharing, and ensures knowledge accessibility.',
    capabilities: ['Knowledge Curation', 'Sharing Facilitation', 'Accessibility Management', 'Expertise Tracking', 'Knowledge Base Maintenance'],
    color: '#64748B',
    type: 'agent' as const,
    humanCost: '$75k/year',
    aiCost: '$1,100/mo',
    efficiency: '94% efficiency',
    replacesRole: 'AI Governance Knowledge Manager',
    subAgents: [
      { id: 'ai-documentation-specialist', uid: 'ktx-22-documentation-specialist', name: 'AI Documentation Specialist', title: 'AI Documentation Specialist', route: '/ai-agent/ai-governance/documentation-specialist' },
      { id: 'ai-governance-training-coordinator', uid: 'ktx-22-governance-training-coordinator', name: 'AI Governance Training Coordinator', title: 'AI Governance Training Coordinator', route: '/ai-agent/ai-governance/governance-training-coordinator' }
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
      tasksAutomatedDaily: 245,
      responseTime: '1.5s',
      accuracyRate: '98.2%',
    },
    hierarchy: {
      department: 'AI Management & Governance',
      level: 'team_lead',
      departmentId: 22,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
