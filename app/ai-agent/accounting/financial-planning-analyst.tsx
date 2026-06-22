import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { ChartLine } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'financial-planning-analyst',
    name: 'Financial Planning Analyst',
    title: 'Financial Planning Analyst',
    description: 'Analyst supporting financial planning processes, budgeting, forecasting, and management reporting.',
    capabilities: [
      "Budget Preparation",
      "Forecasting Support",
      "Management Reporting",
      "Variance Analysis",
      "KPI Tracking",
      "Planning Automation"
    ],
    icon: ChartLine,
    color: '#1565C0',
    type: 'agent' as const,
    humanCost: '$70k/year',
    aiCost: '$1.2k/year',
    efficiency: '58x efficiency improvement',
    replacesRole: 'Financial Planning Analyst',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5.7',
      tasksAutomatedDaily: 2034,
      responseTime: '0.9s',
      accuracyRate: '97.8%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
