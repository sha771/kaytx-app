import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Scissors } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cost-control-analyst',
    name: 'Cost Control Analyst',
    title: 'Cost Control Analyst',
    description: 'Analyst focused on cost control initiatives, monitoring spending, and implementing cost reduction strategies.',
    capabilities: [
      "Cost Control Monitoring",
      "Spending Analysis",
      "Cost Reduction Implementation",
      "Budget Adherence Tracking",
      "Cost Control Reporting",
      "Savings Tracking"
    ],
    icon: Scissors,
    color: '#BF360C',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1.2k/year',
    efficiency: '54x efficiency improvement',
    replacesRole: 'Cost Control Analyst',
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
