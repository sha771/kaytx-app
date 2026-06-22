import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Percent } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'margin-analyst',
    name: 'Margin Analyst',
    title: 'Margin Analyst',
    description: 'Analyst focused on gross and net margin analysis, pricing optimization, and margin improvement strategies.',
    capabilities: [
      "Gross Margin Analysis",
      "Net Margin Analysis",
      "Pricing Optimization",
      "Margin Trend Analysis",
      "Product Mix Analysis",
      "Margin Improvement Strategies"
    ],
    icon: Percent,
    color: '#00695C',
    type: 'agent' as const,
    humanCost: '$70k/year',
    aiCost: '$1.2k/year',
    efficiency: '58x efficiency improvement',
    replacesRole: 'Margin Analyst',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5.7',
      tasksAutomatedDaily: 2034,
      responseTime: '0.9s',
      accuracyRate: '97.8%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
