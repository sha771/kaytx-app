import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { ReceiptText } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vat-specialist',
    name: 'VAT Specialist',
    title: 'VAT Specialist',
    description: 'Specialist managing VAT compliance, filings, and optimization across multiple jurisdictions.',
    capabilities: [
      "VAT Compliance Management",
      "VAT Filing & Reporting",
      "VAT Recovery Optimization",
      "Cross-Border VAT",
      "VAT Exemption Management",
      "VAT Audit Support"
    ],
    icon: ReceiptText,
    color: '#6A1B9A',
    type: 'agent' as const,
    humanCost: '$75k/year',
    aiCost: '$1.2k/year',
    efficiency: '62x efficiency improvement',
    replacesRole: 'VAT Specialist',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6.1',
      tasksAutomatedDaily: 2134,
      responseTime: '0.9s',
      accuracyRate: '98.4%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
