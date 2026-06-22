import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Shield } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'strategy-director-4',
    name: 'Strategy Director 4',
    title: 'Director of Risk Strategy',
    description: 'Directs enterprise risk strategy, risk mitigation planning, and strategic risk management.',
    capabilities: ["Risk Strategy","Risk Mitigation","Strategic Risk Management","Risk Assessment","Resilience Planning"],
    icon: Shield,
    color: '#4A148C',
    type: 'agent' as const,
    humanCost: '$170k/year',
    aiCost: '$3k/year',
    efficiency: '57x efficiency improvement',
    replacesRole: 'Strategy Director',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$14k',
      tasksAutomatedDaily: 186,
      responseTime: '0.5s',
      accuracyRate: '97.6%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
