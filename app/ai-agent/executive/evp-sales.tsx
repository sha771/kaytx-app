import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { TrendingUp } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'evp-sales',
    name: 'Executive VP Sales',
    title: 'Executive Vice President of Sales',
    description: 'Leads sales strategy, revenue generation, and sales team performance management.',
    capabilities: ["Sales Strategy","Revenue Management","Sales Operations","Team Leadership","Market Development"],
    icon: TrendingUp,
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
      tasksAutomatedDaily: 278,
      responseTime: '0.4s',
      accuracyRate: '98.1%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
