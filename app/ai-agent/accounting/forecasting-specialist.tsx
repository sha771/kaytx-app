import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Sparkles } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'forecasting-specialist',
    name: 'Forecasting Specialist',
    title: 'Forecasting Specialist',
    description: 'Specialist developing financial forecasts, predictive models, and what-if scenarios for planning purposes.',
    capabilities: [
      "Financial Forecasting",
      "Predictive Modeling",
      "What-If Scenario Analysis",
      "Trend Forecasting",
      "Forecast Accuracy Monitoring",
      "Rolling Forecasts"
    ],
    icon: Sparkles,
    color: '#6A1B9A',
    type: 'agent' as const,
    humanCost: '$85k/year',
    aiCost: '$1.5k/year',
    efficiency: '56x efficiency improvement',
    replacesRole: 'Forecasting Specialist',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$6.9',
      tasksAutomatedDaily: 2345,
      responseTime: '0.8s',
      accuracyRate: '98.3%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
