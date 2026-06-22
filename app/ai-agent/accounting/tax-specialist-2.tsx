import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { FileText } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'tax-specialist-2',
    name: 'Tax Specialist II',
    title: 'Tax Specialist II',
    description: 'Tax specialist specializing in partnership taxation, K-1 preparation, and pass-through entity compliance for complex structures.',
    capabilities: [
      "Partnership Tax Compliance",
      "K-1 Preparation",
      "Pass-Through Entity Tax",
      "Basis Tracking",
      "Distribution Analysis",
      "Partner Allocation"
    ],
    icon: FileText,
    color: '#64B5F6',
    type: 'agent' as const,
    humanCost: '$90k/year',
    aiCost: '$1.4k/year',
    efficiency: '64x efficiency improvement',
    replacesRole: 'Tax Specialist II',
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$7.3',
      tasksAutomatedDaily: 2380,
      responseTime: '0.8s',
      accuracyRate: '98.4%',
    },
    hierarchy: {
      department: 'Accounting',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
