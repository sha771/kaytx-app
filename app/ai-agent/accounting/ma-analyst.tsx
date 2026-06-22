import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Handshake } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ma-analyst',
    name: 'M&A Analyst',
    title: 'M&A Analyst',
    description: 'Analyst supporting mergers and acquisitions activities, financial due diligence, valuation, and transaction analysis.',
    capabilities: [
      "M&A Financial Analysis",
      "Due Diligence Support",
      "Valuation Modeling",
      "Transaction Structuring",
      "Integration Planning",
      "Deal Documentation"
    ],
    icon: Handshake,
    color: '#1B5E20',
    type: 'agent' as const,
    humanCost: '$100k/year',
    aiCost: '$1.8k/year',
    efficiency: '55x efficiency improvement',
    replacesRole: 'M&A Analyst',
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
      accuracyRate: '98.6%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
