import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Crown } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'chief-of-staff',
    name: 'Chief of Staff',
    title: 'Chief of Staff',
    description: 'The Chief of Staff AI provides executive support, strategic coordination, and office management for C-suite executives.',
    capabilities: ["Executive Support","Strategic Coordination","Office Management","Meeting Preparation","Decision Support","Priority Management"],
    icon: Crown,
    color: '#FFD700',
    type: 'employee' as const,
    humanCost: '$185k/year',
    aiCost: '$3k/year',
    efficiency: '62x efficiency improvement',
    replacesRole: 'Chief of Staff',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$15k',
      tasksAutomatedDaily: 485,
      responseTime: '0.6s',
      accuracyRate: '97.2%',
    },
    hierarchy: {
      department: 'Executive',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
