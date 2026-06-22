import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-asset-allocator',
    uid: 'ktx-14-asset-allocator',
    name: 'AI Asset Allocator',
    title: 'AI Asset Allocator',
    description: 'AI Asset Allocator provides specialized expertise and executes critical tasks for the Trading & Investments department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Risk Assessment', 'Trade Execution', 'Compliance Monitoring', 'Performance Attribution', 'Derivatives Pricing'],
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '81% efficiency',
    replacesRole: 'AI Asset Allocator',
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3602',
      tasksAutomatedDaily: 406,
      responseTime: '1.8s',
      accuracyRate: '98.1%',
    },
    hierarchy: {
      department: 'Trading & Investments',
      level: 'specialist',
      departmentId: 14,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
