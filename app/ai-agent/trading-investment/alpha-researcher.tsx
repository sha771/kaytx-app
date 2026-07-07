import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-alpha-researcher',
    uid: 'ktx-14-alpha-researcher',
    name: 'AI Alpha Researcher',
    title: 'AI Alpha Researcher',
    description: 'AI Alpha Researcher provides specialized expertise and executes critical tasks for the Trading & Investments department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Trade Execution', 'Compliance Monitoring', 'Performance Attribution', 'Derivatives Pricing', 'Quantitative Modeling'],
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '88% efficiency',
    replacesRole: 'AI Alpha Researcher',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3691',
      tasksAutomatedDaily: 423,
      responseTime: '1.8s',
      accuracyRate: '98.4%',
    },
    hierarchy: {
      department: 'Trading & Investments',
      level: 'specialist',
      departmentId: 14,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
