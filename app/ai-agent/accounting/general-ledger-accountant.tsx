import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Ledger } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'general-ledger-accountant',
    name: 'General Ledger Accountant',
    title: 'General Ledger Accountant',
    description: 'Accountant managing general ledger operations, journal entries, account reconciliations, and maintaining financial records.',
    capabilities: [
      "GL Account Management",
      "Journal Entry Processing",
      "Account Reconciliation",
      "Month-End Close Support",
      "Financial Data Integrity",
      "Balance Sheet Review"
    ],
    icon: Ledger,
    color: '#00695C',
    type: 'agent' as const,
    humanCost: '$60k/year',
    aiCost: '$1k/year',
    efficiency: '60x efficiency improvement',
    replacesRole: 'General Ledger Accountant',
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
      accuracyRate: '98.2%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
