import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Calculator } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'intelligent-tax-calculator',
    name: 'AI Intelligent Tax Calculator',
    title: 'Intelligent Tax Calculator',
    description: 'Advanced tax calculation and optimization with intelligent algorithms',
    capabilities: ["Tax Calculation","Optimization","Complex Computations","Scenario Analysis"],
    icon: Calculator,
    color: '#2E7D32',
    type: 'employee' as const,
    humanCost: '$75k/year',
    aiCost: '$2k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'Tax Calculator',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$6.1k',
      tasksAutomatedDaily: 398,
      responseTime: '0.3s',
      accuracyRate: '98.5%',
    },
    hierarchy: {
      department: 'Tax',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
