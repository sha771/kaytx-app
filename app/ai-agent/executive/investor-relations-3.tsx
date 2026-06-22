import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { BarChart3 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'investor-relations-3',
    name: 'Investor Relations Director 3',
    title: 'Director of Financial Communications',
    description: 'Directs financial communications, earnings calls, and financial disclosure management.',
    capabilities: ["Financial Communications","Earnings Calls","Disclosure Management","Financial Reporting","Market Communications"],
    icon: BarChart3,
    color: '#4A148C',
    type: 'agent' as const,
    humanCost: '$190k/year',
    aiCost: '$4k/year',
    efficiency: '48x efficiency improvement',
    replacesRole: 'Investor Relations Director',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$15k',
      tasksAutomatedDaily: 212,
      responseTime: '0.5s',
      accuracyRate: '97.7%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
