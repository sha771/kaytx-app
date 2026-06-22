import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-ethics-advisor',
    uid: 'ktx-22-ai-ethics-advisor',
    name: 'AI Ethics Advisor',
    title: 'AI Ethics Advisor',
    description: 'AI Ethics Advisor provides strategic guidance on ethical AI development and deployment. This AI agent consults on ethical frameworks, moral considerations in AI systems, and helps organizations navigate complex ethical dilemmas in AI implementation.',
    capabilities: ['Ethical Consulting', 'Moral Framework Development', 'Ethical Dilemma Resolution', 'Value Alignment', 'Ethics Training'],
    color: '#3B82F6',
    type: 'agent' as const,
    humanCost: '$110k/year',
    aiCost: '$2,000/mo',
    efficiency: '93% efficiency',
    replacesRole: 'AI Ethics Advisor',
    subAgents: [
      { id: 'ai-ethics-specialist', uid: 'ktx-22-ethics-specialist', name: 'AI Ethics Specialist', title: 'AI Ethics Specialist', route: '/ai-agent/ai-governance/ethics-specialist' }
    ],
    infrastructure: {
      status: 'online',
      health: 96,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$7167',
      tasksAutomatedDaily: 312,
      responseTime: '1.6s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'AI Management & Governance',
      level: 'vp_director',
      departmentId: 22,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
