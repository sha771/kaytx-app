import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Globe } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'international-tax-expert',
    name: 'International Tax Expert',
    title: 'International Tax Expert',
    description: 'Expert in international tax laws, cross-border transactions, BEPS compliance, and global tax planning for multinational enterprises.',
    capabilities: [
      "International Tax Planning",
      "Cross-Border Transaction Analysis",
      "BEPS Compliance",
      "Transfer Pricing Documentation",
      "Foreign Tax Credit Management",
      "Country-Specific Tax Advice"
    ],
    icon: Globe,
    color: '#0D47A1',
    type: 'agent' as const,
    humanCost: '$145k/year',
    aiCost: '$2.5k/year',
    efficiency: '58x efficiency improvement',
    replacesRole: 'International Tax Expert',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11.9',
      tasksAutomatedDaily: 3245,
      responseTime: '0.6s',
      accuracyRate: '98.9%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
