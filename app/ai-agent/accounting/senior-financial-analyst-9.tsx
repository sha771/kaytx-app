import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { TrendingUp } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'senior-financial-analyst-9',
    name: 'Senior Financial Analyst IX',
    title: 'Senior Financial Analyst IX',
    description: 'Analyst specializing in debt management, capital markets access, and financing strategy optimization for corporate growth initiatives.',
    capabilities: [
      "Debt Capital Markets",
      "Financing Strategy",
      "Credit Rating Management",
      "Debt Covenant Compliance",
      "Interest Rate Risk Management",
      "Capital Structure Optimization"
    ],
    icon: TrendingUp,
    color: '#A5D6A7',
    type: 'agent' as const,
    humanCost: '$118k/year',
    aiCost: '$1.9k/year',
    efficiency: '62x efficiency improvement',
    replacesRole: 'Senior Financial Analyst IX',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$9.6',
      tasksAutomatedDaily: 3050,
      responseTime: '0.6s',
      accuracyRate: '98.9%',
    },
    hierarchy: {
      department: 'Accounting',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
