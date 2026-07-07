import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-on-chain-analyzer',
    uid: 'ktx-14-on-chain-analyzer',
    name: 'AI On-chain Analyzer',
    title: 'AI On-chain Analyzer',
    description: 'AI On-chain Analyzer provides specialized expertise and executes critical tasks for the Trading & Investments department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Compliance Monitoring', 'Performance Attribution', 'Derivatives Pricing', 'Quantitative Modeling', 'Portfolio Management'],
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '75% efficiency',
    replacesRole: 'AI On-chain Analyzer',
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
      level: 'specialist',
      departmentId: 14,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
