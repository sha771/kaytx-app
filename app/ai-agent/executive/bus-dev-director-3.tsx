import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'bus-dev-director-3',
    name: 'Business Development Director 3',
    title: 'Director of M&A',
    description: 'Manages M&A strategy, due diligence, and integration planning for acquisitions.',
    capabilities: ["M&A Strategy","Due Diligence","Integration Planning","Deal Analysis","Transaction Management"],
    icon: Briefcase,
    color: '#4A148C',
    type: 'agent' as const,
    humanCost: '$165k/year',
    aiCost: '$3k/year',
    efficiency: '55x efficiency improvement',
    replacesRole: 'Business Development Director',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$13k',
      tasksAutomatedDaily: 198,
      responseTime: '0.5s',
      accuracyRate: '97.8%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
