import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { FileText } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'tax-specialist-6',
    name: 'Tax Specialist VI',
    title: 'Tax Specialist VI',
    description: 'Tax specialist for property tax, real estate transactions, and tax implications of fixed asset management.',
    capabilities: [
      "Property Tax Compliance",
      "Real Estate Tax Analysis",
      "Fixed Asset Taxation",
      "Depreciation Strategy",
      "Transaction Tax Planning",
      "Asset Disposition Tax"
    ],
    icon: FileText,
    color: '#1976D2',
    type: 'agent' as const,
    humanCost: '$87k/year',
    aiCost: '$1.3k/year',
    efficiency: '66x efficiency improvement',
    replacesRole: 'Tax Specialist VI',
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$7.1',
      tasksAutomatedDaily: 2280,
      responseTime: '0.9s',
      accuracyRate: '98.3%',
    },
    hierarchy: {
      department: 'Accounting',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
