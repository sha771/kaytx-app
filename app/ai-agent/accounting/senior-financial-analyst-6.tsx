import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { TrendingUp } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'senior-financial-analyst-6',
    name: 'Senior Financial Analyst VI',
    title: 'Senior Financial Analyst VI',
    description: 'Financial analyst focused on working capital optimization, cash flow management, and liquidity planning for operational efficiency.',
    capabilities: [
      "Working Capital Optimization",
      "Cash Flow Forecasting",
      "Liquidity Management",
      "Banking Relationship Management",
      "Short-Term Investment Strategy",
      "Cash Conversion Cycle"
    ],
    icon: TrendingUp,
    color: '#4CAF50',
    type: 'agent' as const,
    humanCost: '$108k/year',
    aiCost: '$1.6k/year',
    efficiency: '67x efficiency improvement',
    replacesRole: 'Senior Financial Analyst VI',
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$8.9',
      tasksAutomatedDaily: 2750,
      responseTime: '0.8s',
      accuracyRate: '98.4%',
    },
    hierarchy: {
      department: 'Accounting',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
