import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Link } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'supply-chain-finance-analyst',
    name: 'Supply Chain Finance Analyst',
    title: 'Supply Chain Finance Analyst',
    description: 'Analyst managing supply chain finance programs, working capital optimization, and trade finance.',
    capabilities: [
      "Supply Chain Finance Management",
      "Working Capital Optimization",
      "Trade Finance Analysis",
      "Supplier Finance Programs",
      "Inventory Financing",
      "SCF Reporting"
    ],
    icon: Link,
    color: '#0277BD',
    type: 'agent' as const,
    humanCost: '$75k/year',
    aiCost: '$1.2k/year',
    efficiency: '62x efficiency improvement',
    replacesRole: 'Supply Chain Finance Analyst',
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
