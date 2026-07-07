import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { PiggyBank } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'neural-cost-reduction',
    name: 'AI Neural Cost Reduction',
    title: 'Neural Cost Reduction',
    description: 'Neural cost reduction and efficiency improvement with AI',
    capabilities: ["Cost Reduction","Efficiency Improvement","Neural AI","Savings Optimization"],
    icon: PiggyBank,
    color: '#C62828',
    type: 'employee' as const,
    humanCost: '$110k/year',
    aiCost: '$3.0k/year',
    efficiency: '36x efficiency improvement',
    replacesRole: 'Cost Reduction Specialist',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$8.9k',
      tasksAutomatedDaily: 223,
      responseTime: '0.9s',
      accuracyRate: '96.5%',
    },
    hierarchy: {
      department: 'Costing Management',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
