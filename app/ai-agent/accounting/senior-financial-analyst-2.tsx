import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { TrendingUp } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'senior-financial-analyst-2',
    name: 'Senior Financial Analyst II',
    title: 'Senior Financial Analyst II',
    description: 'Expert financial analyst specializing in complex financial modeling, M&A analysis, and strategic investment recommendations for corporate growth initiatives.',
    capabilities: [
      "M&A Due Diligence",
      "Valuation Modeling",
      "Capital Structure Analysis",
      "Investment Portfolio Management",
      "Risk-Return Analysis",
      "Strategic Financial Planning"
    ],
    icon: TrendingUp,
    color: '#2E7D32',
    type: 'agent' as const,
    humanCost: '$105k/year',
    aiCost: '$1.8k/year',
    efficiency: '58x efficiency improvement',
    replacesRole: 'Senior Financial Analyst II',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$8.6',
      tasksAutomatedDaily: 2890,
      responseTime: '0.7s',
      accuracyRate: '98.5%',
    },
    hierarchy: {
      department: 'Accounting',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
