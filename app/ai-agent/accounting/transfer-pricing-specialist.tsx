import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { ArrowLeftRight } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'transfer-pricing-specialist',
    name: 'Transfer Pricing Specialist',
    title: 'Transfer Pricing Specialist',
    description: 'Specialist managing transfer pricing policies, documentation, and compliance for multinational operations.',
    capabilities: [
      "Transfer Pricing Policy Development",
      "TP Documentation",
      "Arm's Length Analysis",
      "Intercompany Pricing",
      "TP Compliance",
      "Audit Defense Support"
    ],
    icon: ArrowLeftRight,
    color: '#1565C0',
    type: 'agent' as const,
    humanCost: '$110k/year',
    aiCost: '$2k/year',
    efficiency: '55x efficiency improvement',
    replacesRole: 'Transfer Pricing Specialist',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$9',
      tasksAutomatedDaily: 2876,
      responseTime: '0.7s',
      accuracyRate: '98.8%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
