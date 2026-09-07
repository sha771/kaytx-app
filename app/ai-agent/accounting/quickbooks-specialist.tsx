import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { FileText } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'quickbooks-specialist',
    name: 'QuickBooks Specialist',
    title: 'QuickBooks Specialist',
    description: 'Specialist in QuickBooks Desktop and Online, managing accounting processes for small and medium businesses.',
    capabilities: [
      "QuickBooks Setup & Configuration",
      "Transaction Management",
      "Reporting Customization",
      "Bank Reconciliation",
      "Third-Party Integration",
      "User Training"
    ],
    icon: FileText,
    color: '#2E7D32',
    type: 'agent' as const,
    humanCost: '$60k/year',
    aiCost: '$1k/year',
    efficiency: '60x efficiency improvement',
    replacesRole: 'QuickBooks Specialist',
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
