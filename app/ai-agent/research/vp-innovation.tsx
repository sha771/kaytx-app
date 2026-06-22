import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-innovation',
    uid: 'ktx-12-vp-innovation',
    name: 'AI VP Innovation',
    title: 'AI VP Innovation',
    description: 'AI VP Innovation drives department strategy and oversees operations for the Research & Development department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Research Methodology', 'Patent Analysis', 'Prototype Development', 'Lab Management', 'Literature Review'],
    color: '#009688',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$1,800/mo',
    efficiency: '87% efficiency',
    replacesRole: 'AI VP Innovation',
    subAgents: [
      { id: 'ai-grant-proposal-writer', uid: 'ktx-12-grant-proposal-writer', name: 'AI Grant Proposal Writer', title: 'AI Grant Proposal Writer', route: '/ai-agent/research/grant-proposal-writer' },
      { id: 'ai-peer-review-organizer', uid: 'ktx-12-peer-review-organizer', name: 'AI Peer Review Organizer', title: 'AI Peer Review Organizer', route: '/ai-agent/research/peer-review-organizer' },
      { id: 'ai-technology-scout', uid: 'ktx-12-technology-scout', name: 'AI Technology Scout', title: 'AI Technology Scout', route: '/ai-agent/research/technology-scout' }
    ],
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
      department: 'Research & Development',
      level: 'vp_director',
      departmentId: 12,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
