import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-clearing-coordinator',
    uid: 'ktx-14-clearing-coordinator',
    name: 'AI Clearing Coordinator',
    title: 'AI Clearing Coordinator',
    description: 'AI Clearing Coordinator leads strategic direction and executive decision-making for the Trading & Investments department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Quantitative Modeling', 'Portfolio Management', 'Market Analysis', 'Risk Assessment', 'Trade Execution'],
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '76% efficiency',
    replacesRole: 'AI Clearing Coordinator',
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11151',
      tasksAutomatedDaily: 529,
      responseTime: '2.1s',
      accuracyRate: '99.3%',
    },
    hierarchy: {
      department: 'Trading & Investments',
      level: 'c_level',
      departmentId: 14,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
