import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { ArrowUpRight } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'accounts-receivable-specialist',
    name: 'Accounts Receivable Specialist',
    title: 'Accounts Receivable Specialist',
    description: 'Specialist managing accounts receivable, invoicing, collections, and customer payment processing to optimize cash flow.',
    capabilities: [
      "Invoice Generation & Delivery",
      "Payment Processing",
      "Customer Account Management",
      "Collections Follow-up",
      "AR Reconciliation",
      "Aging Report Management"
    ],
    icon: ArrowUpRight,
    color: '#2E7D32',
    type: 'agent' as const,
    humanCost: '$50k/year',
    aiCost: '$1k/year',
    efficiency: '50x efficiency improvement',
    replacesRole: 'Accounts Receivable Specialist',
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
