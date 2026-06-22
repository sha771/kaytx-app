import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { TrendingUpIcon as TrendingUp2 } from 'lucide-react-native';

export default function BudgetForecastingSystemPage() {
  const agent = {
    id: 'budget-forecasting-system',
    name: 'AI Budget Forecasting System',
    title: 'Education Agent',
    description: 'Automated Budget Forecasting System agent specializing in financial planning with advanced AI capabilities for budget prediction, expense analysis, and financial modeling.',
    capabilities: ["Budget Prediction","Expense Analysis","Financial Modeling","Revenue Forecasting","Cost Optimization","Financial Reporting"],
    icon: TrendingUp2,
    color: '#8B5CF6',
    type: 'agent' as const,
    humanCost: '$53k/year',
    aiCost: '$1.1k/year',
    efficiency: '15x efficiency improvement',
    replacesRole: 'Budget Analyst',
    infrastructure: {
      status: 'online',
      health: 96,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3,500',
      tasksAutomatedDaily: 60,
      responseTime: '<3s',
      accuracyRate: '97%',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}