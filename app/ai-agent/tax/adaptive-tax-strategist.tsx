import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Target } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'adaptive-tax-strategist',
    name: 'AI Adaptive Tax Strategist',
    title: 'Adaptive Tax Strategist',
    description: 'Adaptive tax strategy development with dynamic optimization',
    capabilities: ["Tax Strategy","Adaptive Planning","Dynamic Optimization","Strategic Development"],
    icon: Target,
    color: '#2E7D32',
    type: 'employee' as const,
    humanCost: '$115k/year',
    aiCost: '$3.1k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'Tax Strategist',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$9.3k',
      tasksAutomatedDaily: 212,
      responseTime: '1.1s',
      accuracyRate: '96.0%',
    },
    hierarchy: {
      department: 'Tax',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
