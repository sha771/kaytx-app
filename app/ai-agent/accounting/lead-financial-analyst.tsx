import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { LineChart } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'lead-financial-analyst',
    name: 'Lead Financial Analyst',
    title: 'Lead Financial Analyst',
    description: 'Lead financial analyst managing team operations, complex analyses, and strategic financial initiatives with cross-functional collaboration.',
    capabilities: [
      "Team Leadership & Mentorship",
      "Complex Financial Modeling",
      "M&A Due Diligence",
      "Valuation Analysis",
      "Strategic Financial Planning",
      "Cross-Functional Projects"
    ],
    icon: LineChart,
    color: '#1B5E20',
    type: 'agent' as const,
    humanCost: '$115k/year',
    aiCost: '$2k/year',
    efficiency: '57x efficiency improvement',
    replacesRole: 'Lead Financial Analyst',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$9.4',
      tasksAutomatedDaily: 3124,
      responseTime: '0.6s',
      accuracyRate: '98.5%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
