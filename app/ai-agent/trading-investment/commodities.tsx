import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { TrendingUp } from 'lucide-react-native';

export default function CommoditiesScreen() {
  const agent = {
    id: 'commodities',
    name: 'Commodities',
    title: 'Commodities Trading Specialist',
    description: 'The Commodities AI specializes in analyzing and trading commodity markets including crude oil, natural gas, precious metals, agricultural products, and industrial metals. Provides real-time market analysis, supply event monitoring, price forecasting, and trading signals for commodity markets worldwide.',
    capabilities: ['Market Analysis', 'Price Forecasting', 'Supply Event Monitoring', 'Trading Signals', 'Risk Assessment', 'Portfolio Optimization'],
    icon: TrendingUp,
    color: '#FFC107',
    type: 'agent' as const,
    humanCost: '$95k/year',
    aiCost: '$1.8k/year',
    efficiency: '52x efficiency improvement',
    replacesRole: 'Commodities Trading Specialist',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7,100',
      tasksAutomatedDaily: 2000,
      responseTime: '0.4s',
      accuracyRate: '93.2%',
    },
    hierarchy: {
      department: 'Trading & Investment',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
