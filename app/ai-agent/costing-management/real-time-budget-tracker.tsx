import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Wallet } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'real-time-budget-tracker',
    name: 'AI Real-Time Budget Tracker',
    title: 'Real-Time Budget Tracker',
    description: 'Real-time budget tracking and management with AI',
    capabilities: ["Budget Tracking","Real-Time Management","Financial Control","Budget Optimization"],
    icon: Wallet,
    color: '#C62828',
    type: 'employee' as const,
    humanCost: '$95k/year',
    aiCost: '$2.5k/year',
    efficiency: '38x efficiency improvement',
    replacesRole: 'Budget Manager',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$7.7k',
      tasksAutomatedDaily: 301,
      responseTime: '0.5s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Costing Management',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
