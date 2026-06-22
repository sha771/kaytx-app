import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Calculator } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'valuation-specialist',
    name: 'Valuation Specialist',
    title: 'Valuation Specialist',
    description: 'Specialist in business valuation, asset valuation, and fair value measurement for financial reporting and transactions.',
    capabilities: [
      "Business Valuation",
      "Asset Valuation",
      "Fair Value Measurement",
      "Valuation Modeling",
      "Impairment Testing",
      "Valuation Reporting"
    ],
    icon: Calculator,
    color: '#F57C00',
    type: 'agent' as const,
    humanCost: '$105k/year',
    aiCost: '$1.8k/year',
    efficiency: '58x efficiency improvement',
    replacesRole: 'Valuation Specialist',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$8.6',
      tasksAutomatedDaily: 2765,
      responseTime: '0.7s',
      accuracyRate: '98.7%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
