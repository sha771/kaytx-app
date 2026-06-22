import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { CreditCard } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'debt-analyst',
    name: 'Debt Analyst',
    title: 'Debt Analyst',
    description: 'Analyst managing debt portfolio, monitoring debt covenants, and optimizing debt structure and costs.',
    capabilities: [
      "Debt Portfolio Management",
      "Covenant Monitoring",
      "Debt Cost Optimization",
      "Refinancing Analysis",
      "Debt Reporting",
      "Interest Rate Risk Analysis"
    ],
    icon: CreditCard,
    color: '#C62828',
    type: 'agent' as const,
    humanCost: '$75k/year',
    aiCost: '$1.2k/year',
    efficiency: '62x efficiency improvement',
    replacesRole: 'Debt Analyst',
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
      responseTime: '0.9s',
      accuracyRate: '98.0%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
