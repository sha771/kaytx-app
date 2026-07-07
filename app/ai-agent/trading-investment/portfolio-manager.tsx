import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-portfolio-manager',
    uid: 'ktx-14-portfolio-manager',
    name: 'AI Portfolio Manager',
    title: 'AI Portfolio Manager',
    description: 'AI Portfolio Manager manages team operations and ensures delivery excellence for the Trading & Investments department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Compliance Monitoring', 'Performance Attribution', 'Derivatives Pricing', 'Quantitative Modeling', 'Portfolio Management'],
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '75% efficiency',
    replacesRole: 'AI Portfolio Manager',
    subAgents: [
      { id: 'ai-desk-performance-monitor', uid: 'ktx-14-desk-performance-monitor', name: 'AI Desk Performance Monitor', title: 'AI Desk Performance Monitor', route: '/ai-agent/trading/desk-performance-monitor' },
      { id: 'ai-fx-hedging-coordinator', uid: 'ktx-14-fx-hedging-coordinator', name: 'AI FX Hedging Coordinator', title: 'AI FX Hedging Coordinator', route: '/ai-agent/trading/fx-hedging-coordinator' },
      { id: 'ai-backtest-engine', uid: 'ktx-14-backtest-engine', name: 'AI Backtest Engine', title: 'AI Backtest Engine', route: '/ai-agent/trading/backtest-engine' }
    ],
    infrastructure: {
      status: 'online',
      health: 85,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3780',
      tasksAutomatedDaily: 440,
      responseTime: '1.9s',
      accuracyRate: '98.6%',
    },
    hierarchy: {
      department: 'Trading & Investments',
      level: 'manager',
      departmentId: 14,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
