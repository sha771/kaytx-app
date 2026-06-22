import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import ScrollText from 'lucide-react-native/dist/esm/icons/scroll-text';

export default function AgentPage() {
  const agent = {
    id: 'accounting-policy-specialist',
    name: 'Accounting Policy Specialist',
    title: 'Accounting Policy Specialist',
    description: 'Specialist developing and maintaining accounting policies, ensuring consistency with accounting standards and best practices.',
    capabilities: [
      "Accounting Policy Development",
      "Policy Documentation",
      "Standard Interpretation",
      "Policy Implementation Support",
      "Policy Training",
      "Policy Compliance Review"
    ],
    icon: ScrollText,
    color: '#6A1B9A',
    type: 'agent' as const,
    humanCost: '$85k/year',
    aiCost: '$1.5k/year',
    efficiency: '56x efficiency improvement',
    replacesRole: 'Accounting Policy Specialist',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$6.9',
      tasksAutomatedDaily: 2345,
      responseTime: '0.8s',
      accuracyRate: '98.3%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
