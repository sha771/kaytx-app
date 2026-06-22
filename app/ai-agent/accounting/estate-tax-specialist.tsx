import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Heart } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'estate-tax-specialist',
    name: 'Estate Tax Specialist',
    title: 'Estate Tax Specialist',
    description: 'Specialist in estate and gift tax planning, compliance, and minimization strategies.',
    capabilities: [
      "Estate Tax Planning",
      "Gift Tax Analysis",
      "Estate Tax Compliance",
      "Trust Taxation",
      "Wealth Transfer Strategies",
      "Estate Tax Return Preparation"
    ],
    icon: Heart,
    color: '#C62828',
    type: 'agent' as const,
    humanCost: '$100k/year',
    aiCost: '$1.8k/year',
    efficiency: '55x efficiency improvement',
    replacesRole: 'Estate Tax Specialist',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$8.2',
      tasksAutomatedDaily: 2654,
      responseTime: '0.6s',
      accuracyRate: '98.7%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
