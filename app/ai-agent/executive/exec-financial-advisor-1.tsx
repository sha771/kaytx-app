import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { PiggyBank } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'exec-financial-advisor-1',
    name: 'Executive Financial Advisor 1',
    title: 'Financial Strategy Advisor',
    description: 'Advises on financial strategy, capital allocation, and financial performance optimization.',
    capabilities: ["Financial Strategy","Capital Allocation","Performance Optimization","Financial Planning","Investment Advisory"],
    icon: PiggyBank,
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
      tasksAutomatedDaily: 228,
      responseTime: '0.4s',
      accuracyRate: '97.8%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
