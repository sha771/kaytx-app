import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { TrendingUp } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'senior-financial-analyst-8',
    name: 'Senior Financial Analyst VIII',
    title: 'Senior Financial Analyst VIII',
    description: 'Financial analyst dedicated to financial planning and analysis (FP&A), budgeting cycles, and management reporting for leadership teams.',
    capabilities: [
      "Budget Planning & Analysis",
      "Management Reporting",
      "KPI Dashboard Management",
      "Financial Performance Analysis",
      "Variance Analysis",
      "Forecasting Models"
    ],
    icon: TrendingUp,
    color: '#81C784',
    type: 'agent' as const,
    humanCost: '$100k/year',
    aiCost: '$1.5k/year',
    efficiency: '66x efficiency improvement',
    replacesRole: 'Senior Financial Analyst VIII',
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$8.2',
      tasksAutomatedDaily: 2650,
      responseTime: '0.8s',
      accuracyRate: '98.3%',
    },
    hierarchy: {
      department: 'Accounting',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
