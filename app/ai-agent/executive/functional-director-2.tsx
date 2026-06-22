import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { DollarSign } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'functional-director-2',
    name: 'Functional Director 2',
    title: 'Director of Finance',
    description: 'Manages financial functions, budgeting, financial planning, and analysis.',
    capabilities: ["Financial Direction","Budget Management","Financial Planning","Analysis","Reporting"],
    icon: DollarSign,
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
      tasksAutomatedDaily: 185,
      responseTime: '0.5s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
