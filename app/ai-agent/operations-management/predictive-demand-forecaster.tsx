import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { BarChart3 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'predictive-demand-forecaster',
    name: 'AI Predictive Demand Forecaster',
    title: 'Predictive Demand Forecaster',
    description: 'Predictive demand forecasting and planning with AI',
    capabilities: ["Demand Forecasting","Predictive Planning","Market Analysis","Supply Planning"],
    icon: BarChart3,
    color: '#00695C',
    type: 'employee' as const,
    humanCost: '$118k/year',
    aiCost: '$3.2k/year',
    efficiency: '36x efficiency improvement',
    replacesRole: 'Demand Forecaster',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$9.5k',
      tasksAutomatedDaily: 194,
      responseTime: '1.0s',
      accuracyRate: '95.8%',
    },
    hierarchy: {
      department: 'Operations Management',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
