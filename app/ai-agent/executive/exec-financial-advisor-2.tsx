import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { LineChart } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'exec-financial-advisor-2',
    name: 'Executive Financial Advisor 2',
    title: 'Treasury & Cash Advisor',
    description: 'Advises on treasury management, cash optimization, and liquidity planning strategies.',
    capabilities: ["Treasury Management","Cash Optimization","Liquidity Planning","Banking Relations","Risk Management"],
    icon: LineChart,
    color: '#4A148C',
    type: 'agent' as const,
    humanCost: '$200k/year',
    aiCost: '$4k/year',
    efficiency: '50x efficiency improvement',
    replacesRole: 'Executive Financial Advisor',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$16k',
      tasksAutomatedDaily: 232,
      responseTime: '0.4s',
      accuracyRate: '98.1%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
