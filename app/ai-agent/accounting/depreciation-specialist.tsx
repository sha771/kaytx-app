import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Timer } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'depreciation-specialist',
    name: 'Depreciation Specialist',
    title: 'Depreciation Specialist',
    description: 'Specialist managing depreciation calculations, tax depreciation schedules, and asset value assessment.',
    capabilities: [
      "Depreciation Calculation",
      "Tax Depreciation Management",
      "Asset Valuation",
      "Impairment Testing Support",
      "Depreciation Schedule Optimization",
      "Asset Life Analysis"
    ],
    icon: Timer,
    color: '#BF360C',
    type: 'agent' as const,
    humanCost: '$60k/year',
    aiCost: '$1k/year',
    efficiency: '60x efficiency improvement',
    replacesRole: 'Depreciation Specialist',
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
      accuracyRate: '98.1%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
