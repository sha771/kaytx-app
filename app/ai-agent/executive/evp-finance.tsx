import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { DollarSign } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'evp-finance',
    name: 'Executive VP Finance',
    title: 'Executive Vice President of Finance',
    description: 'Manages financial operations, treasury functions, and financial strategy implementation.',
    capabilities: ["Financial Operations","Treasury Management","Financial Planning","Risk Management","Financial Reporting"],
    icon: DollarSign,
    color: '#4A148C',
    type: 'agent' as const,
    humanCost: '$300k/year',
    aiCost: '$6k/year',
    efficiency: '50x efficiency improvement',
    replacesRole: 'Executive Vice President',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$24k',
      tasksAutomatedDaily: 285,
      responseTime: '0.4s',
      accuracyRate: '98.2%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
