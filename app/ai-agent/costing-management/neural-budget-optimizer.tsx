import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { PieChart } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'neural-budget-optimizer',
    name: 'AI Neural Budget Optimizer',
    title: 'Neural Budget Optimizer',
    description: 'Neural budget optimization and planning with AI',
    capabilities: ["Budget Optimization","Neural AI","Financial Planning","Budget Management"],
    icon: PieChart,
    color: '#C62828',
    type: 'employee' as const,
    humanCost: '$108k/year',
    aiCost: '$2.9k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'Budget Optimizer',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$8.7k',
      tasksAutomatedDaily: 234,
      responseTime: '0.8s',
      accuracyRate: '96.6%',
    },
    hierarchy: {
      department: 'Costing Management',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
