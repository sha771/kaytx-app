import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { TrendingUp } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'chief-investment-officer',
    name: 'chief-investment-officer',
    title: 'chief-investment-officer',
    description: 'The chief-investment-officer AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: TrendingUp,
    color: '#FFC107',
    type: 'agent' as const,
    humanCost: '$64k/year',
    aiCost: '$1k/year',
    efficiency: '64x efficiency improvement',
    replacesRole: 'chief-investment-officer',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 768,
      responseTime: '0.9s',
      accuracyRate: '95.0%',
    },
    hierarchy: {
      department: 'Trading',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
