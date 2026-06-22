import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Wallet } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'expense-analyst',
    name: 'Expense Analyst',
    title: 'Expense Analyst',
    description: 'Analyst monitoring expense trends, analyzing cost structures, and identifying cost-saving opportunities.',
    capabilities: [
      "Expense Analysis",
      "Cost Trend Monitoring",
      "Expense Categorization",
      "Cost Saving Identification",
      "Expense Reporting",
      "Budget vs Actual Analysis"
    ],
    icon: Wallet,
    color: '#E65100',
    type: 'agent' as const,
    humanCost: '$60k/year',
    aiCost: '$1k/year',
    efficiency: '60x efficiency improvement',
    replacesRole: 'Expense Analyst',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4.9',
      tasksAutomatedDaily: 1923,
      responseTime: '1.0s',
      accuracyRate: '97.8%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
