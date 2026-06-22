import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { PiggyBank } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'investment-manager-2',
    uid: 'ktx-15-investment-manager-2',
    name: 'Investment Manager 2',
    title: 'Private Equity Real Estate Manager',
    description: 'Private Equity Real Estate Manager manages private equity real estate funds, investor relations, and fund performance.',
    capabilities: ['Private Equity', 'Fund Management', 'Investor Relations', 'Fund Performance', 'Capital Raising'],
    color: '#8D6E63',
    type: 'agent' as const,
    humanCost: '$165k/year',
    aiCost: '$3,300/mo',
    efficiency: '93% efficiency',
    replacesRole: 'Investment Manager',
    infrastructure: {
      status: 'online',
      health: 95,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$13,067',
      tasksAutomatedDaily: 515,
      responseTime: '2.1s',
      accuracyRate: '95.5%',
    },
    hierarchy: {
      department: 'Real Estate & Property',
      level: 'manager',
      departmentId: 15,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
