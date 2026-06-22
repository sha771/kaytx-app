import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { FileText } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'tax-specialist-8',
    name: 'Tax Specialist VIII',
    title: 'Tax Specialist VIII',
    description: 'Tax specialist for mergers and acquisitions transactions, tax due diligence, and post-deal integration tax planning.',
    capabilities: [
      "M&A Tax Due Diligence",
      "Transaction Structuring",
      "Post-Acquisition Integration",
      "Tax Asset Analysis",
      "Purchase Price Allocation",
      "Section 338 Elections"
    ],
    icon: FileText,
    color: '#0D47A1',
    type: 'agent' as const,
    humanCost: '$110k/year',
    aiCost: '$1.7k/year',
    efficiency: '64x efficiency improvement',
    replacesRole: 'Tax Specialist VIII',
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$9.0',
      tasksAutomatedDaily: 2780,
      responseTime: '0.7s',
      accuracyRate: '98.8%',
    },
    hierarchy: {
      department: 'Accounting',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
