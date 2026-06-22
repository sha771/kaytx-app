import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { PieChart } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'management-accountant',
    name: 'Management Accountant',
    title: 'Management Accountant',
    description: 'Management accountant providing financial information and analysis for internal decision-making, budgeting, and performance evaluation.',
    capabilities: [
      "Management Reporting",
      "Budget Preparation & Analysis",
      "Performance Measurement",
      "Decision Support Analysis",
      "Forecasting & Projections",
      "KPI Tracking"
    ],
    icon: PieChart,
    color: '#00838F',
    type: 'agent' as const,
    humanCost: '$75k/year',
    aiCost: '$1.2k/year',
    efficiency: '62x efficiency improvement',
    replacesRole: 'Management Accountant',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6.1',
      tasksAutomatedDaily: 2134,
      responseTime: '0.9s',
      accuracyRate: '98.0%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
