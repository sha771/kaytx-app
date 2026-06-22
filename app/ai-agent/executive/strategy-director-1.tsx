import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Target } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'strategy-director-1',
    name: 'Strategy Director 1',
    title: 'Director of Corporate Strategy',
    description: 'Leads corporate strategy development, strategic planning, and long-term vision execution.',
    capabilities: ["Corporate Strategy","Strategic Planning","Vision Execution","Competitive Analysis","Strategic Alignment"],
    icon: Target,
    color: '#4A148C',
    type: 'agent' as const,
    humanCost: '$170k/year',
    aiCost: '$3k/year',
    efficiency: '57x efficiency improvement',
    replacesRole: 'Strategy Director',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$14k',
      tasksAutomatedDaily: 185,
      responseTime: '0.5s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
