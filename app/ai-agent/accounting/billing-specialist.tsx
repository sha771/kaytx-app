import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Receipt } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'billing-specialist',
    name: 'Billing Specialist',
    title: 'Billing Specialist',
    description: 'Specialist managing billing operations, invoice generation, billing inquiries, and revenue recognition support.',
    capabilities: [
      "Invoice Generation",
      "Billing Process Management",
      "Customer Billing Inquiries",
      "Billing Dispute Resolution",
      "Revenue Recording Support",
      "Billing System Maintenance"
    ],
    icon: Receipt,
    color: '#00838F',
    type: 'agent' as const,
    humanCost: '$50k/year',
    aiCost: '$1k/year',
    efficiency: '50x efficiency improvement',
    replacesRole: 'Billing Specialist',
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
