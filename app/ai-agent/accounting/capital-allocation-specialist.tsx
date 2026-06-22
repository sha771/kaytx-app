import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { PieChart } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'capital-allocation-specialist',
    name: 'Capital Allocation Specialist',
    title: 'Capital Allocation Specialist',
    description: 'Specialist analyzing capital allocation decisions, investment prioritization, and capital structure optimization.',
    capabilities: [
      "Capital Allocation Analysis",
      "Investment Prioritization",
      "Capital Structure Optimization",
      "ROI Analysis",
      "Capital Budgeting",
      "Dividend Policy Analysis"
    ],
    icon: PieChart,
    color: '#1B5E20',
    type: 'agent' as const,
    humanCost: '$95k/year',
    aiCost: '$1.5k/year',
    efficiency: '63x efficiency improvement',
    replacesRole: 'Capital Allocation Specialist',
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
      accuracyRate: '98.6%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
