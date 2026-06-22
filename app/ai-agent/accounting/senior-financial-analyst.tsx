import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { TrendingUp } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'senior-financial-analyst',
    name: 'Senior Financial Analyst',
    title: 'Senior Financial Analyst',
    description: 'Advanced financial analysis specialist providing deep insights into financial performance, trends, and strategic recommendations for executive decision-making.',
    capabilities: [
      "Financial Modeling & Forecasting",
      "Investment Analysis",
      "Budget Variance Analysis",
      "Performance Metrics Tracking",
      "Strategic Planning Support",
      "Executive Reporting"
    ],
    icon: TrendingUp,
    color: '#1B5E20',
    type: 'agent' as const,
    humanCost: '$95k/year',
    aiCost: '$1.5k/year',
    efficiency: '63x efficiency improvement',
    replacesRole: 'Senior Financial Analyst',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$7.8',
      tasksAutomatedDaily: 2456,
      responseTime: '0.8s',
      accuracyRate: '98.2%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
