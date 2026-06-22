import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Compass } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'strategic-finance-analyst',
    name: 'Strategic Finance Analyst',
    title: 'Strategic Finance Analyst',
    description: 'Analyst supporting strategic financial decisions, long-term planning, and corporate strategy development.',
    capabilities: [
      "Strategic Analysis",
      "Long-Term Planning",
      "Corporate Strategy Support",
      "Capital Allocation Analysis",
      "Strategic Initiative Evaluation",
      "Board Presentation Support"
    ],
    icon: Compass,
    color: '#0D47A1',
    type: 'agent' as const,
    humanCost: '$100k/year',
    aiCost: '$1.8k/year',
    efficiency: '55x efficiency improvement',
    replacesRole: 'Strategic Finance Analyst',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$8.2',
      tasksAutomatedDaily: 2654,
      responseTime: '0.6s',
      accuracyRate: '98.6%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
