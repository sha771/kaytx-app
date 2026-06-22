import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Target } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'chief-strategy-officer',
    name: 'Chief Strategy Officer',
    title: 'Chief Strategy Officer',
    description: 'The Chief Strategy Officer AI develops and executes organizational strategy, market analysis, and competitive intelligence.',
    capabilities: ["Strategic Planning","Market Analysis","Competitive Intelligence","Business Development","Growth Strategy","M&A Advisory"],
    icon: Target,
    color: '#1E40AF',
    type: 'employee' as const,
    humanCost: '$225k/year',
    aiCost: '$4k/year',
    efficiency: '56x efficiency improvement',
    replacesRole: 'Chief Strategy Officer',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$18k',
      tasksAutomatedDaily: 520,
      responseTime: '0.5s',
      accuracyRate: '98.1%',
    },
    hierarchy: {
      department: 'Executive',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
