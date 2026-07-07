import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Star } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'intelligent-credit-finder',
    name: 'AI Intelligent Credit Finder',
    title: 'Intelligent Credit Finder',
    description: 'Tax credit identification and optimization with intelligent algorithms',
    capabilities: ["Credit Identification","Tax Credits","Optimization","Savings Discovery"],
    icon: Star,
    color: '#2E7D32',
    type: 'employee' as const,
    humanCost: '$92k/year',
    aiCost: '$2.5k/year',
    efficiency: '36x efficiency improvement',
    replacesRole: 'Credit Specialist',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$7.5k',
      tasksAutomatedDaily: 289,
      responseTime: '0.8s',
      accuracyRate: '96.7%',
    },
    hierarchy: {
      department: 'Tax',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
