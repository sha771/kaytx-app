import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { TrendingDown } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'accounts-payable-manager',
    name: 'Accounts Payable Manager',
    title: 'Accounts Payable Manager',
    description: 'Manager overseeing accounts payable department, optimizing payment processes, managing vendor relationships, and ensuring timely payments.',
    capabilities: [
      "AP Department Management",
      "Payment Process Optimization",
      "Vendor Relationship Management",
      "Cash Flow Planning Support",
      "Team Leadership",
      "AP Policy Development"
    ],
    icon: TrendingDown,
    color: '#BF360C',
    type: 'agent' as const,
    humanCost: '$75k/year',
    aiCost: '$1.2k/year',
    efficiency: '62x efficiency improvement',
    replacesRole: 'Accounts Payable Manager',
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
      responseTime: '0.8s',
      accuracyRate: '98.0%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
