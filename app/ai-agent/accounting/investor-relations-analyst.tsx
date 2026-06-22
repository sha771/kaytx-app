import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { MessageSquare } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'investor-relations-analyst',
    name: 'Investor Relations Analyst',
    title: 'Investor Relations Analyst',
    description: 'Analyst supporting investor communications, earnings preparation, and shareholder engagement activities.',
    capabilities: [
      "Investor Communication Support",
      "Earnings Preparation",
      "Shareholder Analytics",
      "Presentation Development",
      "IR Material Creation",
      "Investor Inquiry Support"
    ],
    icon: MessageSquare,
    color: '#0D47A1',
    type: 'agent' as const,
    humanCost: '$80k/year',
    aiCost: '$1.2k/year',
    efficiency: '66x efficiency improvement',
    replacesRole: 'Investor Relations Analyst',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$6.5',
      tasksAutomatedDaily: 2234,
      responseTime: '0.9s',
      accuracyRate: '98.3%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
