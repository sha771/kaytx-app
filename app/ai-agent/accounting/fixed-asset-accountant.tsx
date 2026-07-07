import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Building } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'fixed-asset-accountant',
    name: 'Fixed Asset Accountant',
    title: 'Fixed Asset Accountant',
    description: 'Accountant managing fixed asset records, depreciation schedules, asset tracking, and capitalization policies.',
    capabilities: [
      "Fixed Asset Tracking",
      "Depreciation Schedule Management",
      "Asset Capitalization",
      "Asset Disposition",
      "Asset Reconciliation",
      "Capital Project Accounting"
    ],
    icon: Building,
    color: '#F57C00',
    type: 'agent' as const,
    humanCost: '$60k/year',
    aiCost: '$1k/year',
    efficiency: '60x efficiency improvement',
    replacesRole: 'Fixed Asset Accountant',
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
      accuracyRate: '98.0%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}