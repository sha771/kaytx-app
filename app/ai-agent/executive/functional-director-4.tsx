import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { TrendingUp } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'functional-director-4',
    name: 'Functional Director 4',
    title: 'Director of Sales',
    description: 'Leads sales functions, revenue generation, and sales team performance management.',
    capabilities: ["Sales Direction","Revenue Generation","Team Performance","Sales Strategy","Customer Development"],
    icon: TrendingUp,
    color: '#4A148C',
    type: 'agent' as const,
    humanCost: '$150k/year',
    aiCost: '$3k/year',
    efficiency: '50x efficiency improvement',
    replacesRole: 'Functional Director',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$12k',
      tasksAutomatedDaily: 182,
      responseTime: '0.5s',
      accuracyRate: '96.8%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
