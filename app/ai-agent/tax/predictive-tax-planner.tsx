import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Calculator } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'predictive-tax-planner',
    name: 'AI Predictive Tax Planner',
    title: 'Predictive Tax Planner',
    description: 'Strategic tax planning with predictive analytics and optimization algorithms',
    capabilities: ["Tax Planning","Predictive Analytics","Optimization","Strategy Development"],
    icon: Calculator,
    color: '#2E7D32',
    type: 'employee' as const,
    humanCost: '$115k/year',
    aiCost: '$3k/year',
    efficiency: '38x efficiency improvement',
    replacesRole: 'Tax Planner',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$9.3k',
      tasksAutomatedDaily: 289,
      responseTime: '0.7s',
      accuracyRate: '97.2%',
    },
    hierarchy: {
      department: 'Tax',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
