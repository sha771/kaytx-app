import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-knowledge-manager',
    uid: 'ktx-22-ai-knowledge-manager',
    name: 'AI Knowledge Manager',
    title: 'AI Knowledge Manager',
    description: 'AI Knowledge Manager oversees the documentation and knowledge management systems for AI governance. This AI agent maintains governance documentation, manages knowledge repositories, and ensures information accessibility across the organization.',
    capabilities: ['Knowledge Management', 'Documentation Systems', 'Information Architecture', 'Repository Management', 'Knowledge Sharing'],
    color: '#F59E0B',
    type: 'agent' as const,
    humanCost: '$92k/year',
    aiCost: '$1,520/mo',
    efficiency: '91% efficiency',
    replacesRole: 'AI Knowledge Manager',
    subAgents: [
      { id: 'ai-documentation-specialist', uid: 'ktx-22-documentation-specialist', name: 'AI Documentation Specialist', title: 'AI Documentation Specialist', route: '/ai-agent/ai-governance/documentation-specialist' }
    ],
    infrastructure: {
      status: 'online',
      health: 92,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$6000',
      tasksAutomatedDaily: 275,
      responseTime: '1.8s',
      accuracyRate: '96.0%',
    },
    hierarchy: {
      department: 'AI Management & Governance',
      level: 'manager',
      departmentId: 22,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
