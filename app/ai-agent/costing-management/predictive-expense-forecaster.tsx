import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { LineChart } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'predictive-expense-forecaster',
    name: 'AI Predictive Expense Forecaster',
    title: 'Predictive Expense Forecaster',
    description: 'Predictive expense forecasting and management with AI',
    capabilities: ["Expense Forecasting","Predictive Management","Financial Planning","Expense Control"],
    icon: LineChart,
    color: '#C62828',
    type: 'employee' as const,
    humanCost: '$102k/year',
    aiCost: '$2.7k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'Expense Forecaster',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$8.3k',
      tasksAutomatedDaily: 256,
      responseTime: '0.7s',
      accuracyRate: '96.9%',
    },
    hierarchy: {
      department: 'Costing Management',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
