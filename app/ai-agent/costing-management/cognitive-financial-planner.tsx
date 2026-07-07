import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { DollarSign } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cognitive-financial-planner',
    name: 'AI Cognitive Financial Planner',
    title: 'Cognitive Financial Planner',
    description: 'Intelligent financial planning and analysis with cognitive AI',
    capabilities: ["Financial Planning","Analysis","Strategic Planning","Financial Intelligence"],
    icon: DollarSign,
    color: '#C62828',
    type: 'employee' as const,
    humanCost: '$125k/year',
    aiCost: '$3.5k/year',
    efficiency: '35x efficiency improvement',
    replacesRole: 'Financial Planner',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$10.1k',
      tasksAutomatedDaily: 178,
      responseTime: '1.1s',
      accuracyRate: '95.6%',
    },
    hierarchy: {
      department: 'Costing Management',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
