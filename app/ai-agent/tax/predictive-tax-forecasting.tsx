import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { TrendingUp } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'predictive-tax-forecasting',
    name: 'AI Predictive Tax Forecasting',
    title: 'Predictive Tax Forecasting',
    description: 'Tax forecasting and prediction with advanced modeling capabilities',
    capabilities: ["Tax Forecasting","Predictive Modeling","Future Planning","Trend Analysis"],
    icon: TrendingUp,
    color: '#2E7D32',
    type: 'employee' as const,
    humanCost: '$95k/year',
    aiCost: '$2.5k/year',
    efficiency: '38x efficiency improvement',
    replacesRole: 'Tax Forecaster',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$7.7k',
      tasksAutomatedDaily: 267,
      responseTime: '0.7s',
      accuracyRate: '96.9%',
    },
    hierarchy: {
      department: 'Tax',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
