import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { PieChart } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'neural-budget-allocator',
    name: 'AI Neural Budget Allocator',
    title: 'Neural Budget Allocator',
    description: 'Neural budget allocation and optimization with AI',
    capabilities: ["Budget Allocation","Optimization","Financial Planning","Resource Distribution"],
    icon: PieChart,
    color: '#1565C0',
    type: 'employee' as const,
    humanCost: '$98k/year',
    aiCost: '$2.6k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'Budget Analyst',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$7.9k',
      tasksAutomatedDaily: 289,
      responseTime: '0.6s',
      accuracyRate: '97.1%',
    },
    hierarchy: {
      department: 'Public Sector',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
