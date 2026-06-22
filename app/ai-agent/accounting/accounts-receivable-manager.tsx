import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { TrendingUp } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'accounts-receivable-manager',
    name: 'Accounts Receivable Manager',
    title: 'Accounts Receivable Manager',
    description: 'Manager overseeing accounts receivable operations, collections strategies, and customer credit policies to maximize cash collection.',
    capabilities: [
      "AR Department Management",
      "Collections Strategy Development",
      "Credit Policy Management",
      "Cash Flow Optimization",
      "Team Leadership",
      "Customer Relationship Management"
    ],
    icon: TrendingUp,
    color: '#1B5E20',
    type: 'agent' as const,
    humanCost: '$75k/year',
    aiCost: '$1.2k/year',
    efficiency: '62x efficiency improvement',
    replacesRole: 'Accounts Receivable Manager',
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
      responseTime: '0.8s',
      accuracyRate: '98.0%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
