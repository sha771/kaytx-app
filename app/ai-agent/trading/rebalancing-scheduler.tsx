import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-rebalancing-scheduler',
    uid: 'ktx-14-rebalancing-scheduler',
    name: 'AI Rebalancing Scheduler',
    title: 'AI Rebalancing Scheduler',
    description: 'AI Rebalancing Scheduler provides specialized expertise and executes critical tasks for the Trading & Investments department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Portfolio Management', 'Market Analysis', 'Risk Assessment', 'Trade Execution', 'Compliance Monitoring'],
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '83% efficiency',
    replacesRole: 'AI Rebalancing Scheduler',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4136',
      tasksAutomatedDaily: 108,
      responseTime: '2.2s',
      accuracyRate: '94.0%',
    },
    hierarchy: {
      department: 'Trading & Investments',
      level: 'specialist',
      departmentId: 14,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
