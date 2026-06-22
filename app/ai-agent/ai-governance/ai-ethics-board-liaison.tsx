import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-ethics-board-liaison',
    uid: 'ktx-22-ai-ethics-board-liaison',
    name: 'AI Ethics Board Liaison',
    title: 'AI Ethics Board Liaison',
    description: 'AI Ethics Board Liaison coordinates between AI governance teams and ethics boards. This AI agent prepares ethics board materials, facilitates ethics reviews, and implements ethics board recommendations.',
    capabilities: ['Board Coordination', 'Material Preparation', 'Review Facilitation', 'Recommendation Implementation', 'Ethics Communication'],
    color: '#8B5CF6',
    type: 'agent' as const,
    humanCost: '$90k/year',
    aiCost: '$1,400/mo',
    efficiency: '91% efficiency',
    replacesRole: 'AI Ethics Board Liaison',
    subAgents: [
      { id: 'ai-ethics-specialist', uid: 'ktx-22-ai-ethics-specialist', name: 'AI Ethics Specialist', title: 'AI Ethics Specialist', route: '/ai-agent/ai-governance/ai-ethics-specialist' },
      { id: 'ai-transparency-specialist', uid: 'ktx-22-transparency-specialist', name: 'AI Transparency Specialist', title: 'AI Transparency Specialist', route: '/ai-agent/ai-governance/transparency-specialist' }
    ],
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5416',
      tasksAutomatedDaily: 278,
      responseTime: '1.9s',
      accuracyRate: '96.7%',
    },
    hierarchy: {
      department: 'AI Management & Governance',
      level: 'manager',
      departmentId: 22,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
