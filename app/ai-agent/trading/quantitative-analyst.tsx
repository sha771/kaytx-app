import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-quantitative-analyst',
    uid: 'ktx-14-quantitative-analyst',
    name: 'AI Quantitative Analyst',
    title: 'AI Quantitative Analyst',
    description: 'AI Quantitative Analyst coordinates team activities and ensures quality output for the Trading & Investments department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Quantitative Modeling', 'Portfolio Management', 'Market Analysis', 'Risk Assessment', 'Trade Execution'],
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '76% efficiency',
    replacesRole: 'AI Quantitative Analyst',
    subAgents: [
      { id: 'ai-rebalancing-scheduler', uid: 'ktx-14-rebalancing-scheduler', name: 'AI Rebalancing Scheduler', title: 'AI Rebalancing Scheduler', route: '/ai-agent/trading/rebalancing-scheduler' },
      { id: 'ai-factor-modeler', uid: 'ktx-14-factor-modeler', name: 'AI Factor Modeler', title: 'AI Factor Modeler', route: '/ai-agent/trading/factor-modeler' },
      { id: 'ai-latency-optimizer', uid: 'ktx-14-latency-optimizer', name: 'AI Latency Optimizer', title: 'AI Latency Optimizer', route: '/ai-agent/trading/latency-optimizer' }
    ],
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4047',
      tasksAutomatedDaily: 491,
      responseTime: '2.1s',
      accuracyRate: '99.3%',
    },
    hierarchy: {
      department: 'Trading & Investments',
      level: 'team_lead',
      departmentId: 14,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
