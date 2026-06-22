import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { ClipboardList } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'budget-analyst',
    name: 'Budget Analyst',
    title: 'Budget Analyst',
    description: 'Analyst preparing, analyzing, and monitoring budgets, providing variance analysis and budget recommendations to management.',
    capabilities: [
      "Budget Preparation",
      "Budget Analysis",
      "Variance Analysis",
      "Forecasting Support",
      "Budget Recommendations",
      "Performance Tracking"
    ],
    icon: ClipboardList,
    color: '#6A1B9A',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1.2k/year',
    efficiency: '54x efficiency improvement',
    replacesRole: 'Budget Analyst',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5.3',
      tasksAutomatedDaily: 1987,
      responseTime: '0.9s',
      accuracyRate: '97.9%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
