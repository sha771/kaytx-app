import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Lightbulb } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'financial-advisor',
    name: 'Financial Advisor',
    title: 'Financial Advisor',
    description: 'Advisor providing financial guidance, investment recommendations, and wealth management strategies.',
    capabilities: [
      "Financial Planning",
      "Investment Recommendations",
      "Wealth Management",
      "Retirement Planning",
      "Risk Assessment",
      "Portfolio Strategy"
    ],
    icon: Lightbulb,
    color: '#F9A825',
    type: 'agent' as const,
    humanCost: '$85k/year',
    aiCost: '$1.5k/year',
    efficiency: '56x efficiency improvement',
    replacesRole: 'Financial Advisor',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$6.9',
      tasksAutomatedDaily: 2345,
      responseTime: '0.8s',
      accuracyRate: '97.8%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
