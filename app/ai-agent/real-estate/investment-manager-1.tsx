import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { DollarSign } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'investment-manager-1',
    uid: 'ktx-15-investment-manager-1',
    name: 'Investment Manager 1',
    title: 'Real Estate Investment Manager',
    description: 'Real Estate Investment Manager manages real estate investments, deal sourcing, and investment analysis.',
    capabilities: ['Real Estate Investments', 'Deal Sourcing', 'Investment Analysis', 'Capital Deployment', 'Investment Strategy'],
    color: '#8D6E63',
    type: 'agent' as const,
    humanCost: '$155k/year',
    aiCost: '$3,100/mo',
    efficiency: '92% efficiency',
    replacesRole: 'Investment Manager',
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$12,267',
      tasksAutomatedDaily: 502,
      responseTime: '2.2s',
      accuracyRate: '95.0%',
    },
    hierarchy: {
      department: 'Real Estate & Property',
      level: 'manager',
      departmentId: 15,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
