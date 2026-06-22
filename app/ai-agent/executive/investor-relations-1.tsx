import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { TrendingUp } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'investor-relations-1',
    name: 'Investor Relations Director 1',
    title: 'Director of Investor Relations',
    description: 'Leads investor relations strategy, shareholder communications, and investor engagement.',
    capabilities: ["Investor Relations","Shareholder Communications","Investor Engagement","IR Strategy","Financial Communications"],
    icon: TrendingUp,
    color: '#4A148C',
    type: 'agent' as const,
    humanCost: '$190k/year',
    aiCost: '$4k/year',
    efficiency: '48x efficiency improvement',
    replacesRole: 'Investor Relations Director',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$15k',
      tasksAutomatedDaily: 210,
      responseTime: '0.5s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
