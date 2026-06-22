import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { ArrowDownLeft } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'accounts-payable-specialist',
    name: 'Accounts Payable Specialist',
    title: 'Accounts Payable Specialist',
    description: 'Specialist managing accounts payable processes, invoice processing, vendor payments, and maintaining positive vendor relationships.',
    capabilities: [
      "Invoice Processing",
      "Vendor Payment Management",
      "Invoice Verification",
      "Payment Scheduling",
      "Vendor Communication",
      "AP Reconciliation"
    ],
    icon: ArrowDownLeft,
    color: '#E65100',
    type: 'agent' as const,
    humanCost: '$50k/year',
    aiCost: '$1k/year',
    efficiency: '50x efficiency improvement',
    replacesRole: 'Accounts Payable Specialist',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4.1',
      tasksAutomatedDaily: 1765,
      responseTime: '1.0s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
