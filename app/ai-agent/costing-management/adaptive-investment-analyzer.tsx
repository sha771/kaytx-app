import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Banknote } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'adaptive-investment-analyzer',
    name: 'AI Adaptive Investment Analyzer',
    title: 'Adaptive Investment Analyzer',
    description: 'Adaptive investment analysis and recommendations with AI',
    capabilities: ["Investment Analysis","Adaptive Learning","Financial Recommendations","Portfolio Management"],
    icon: Banknote,
    color: '#C62828',
    type: 'employee' as const,
    humanCost: '$130k/year',
    aiCost: '$3.8k/year',
    efficiency: '34x efficiency improvement',
    replacesRole: 'Investment Analyst',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$10.5k',
      tasksAutomatedDaily: 167,
      responseTime: '1.2s',
      accuracyRate: '95.5%',
    },
    hierarchy: {
      department: 'Costing Management',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
