import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-portfolio-allocation-director',
    uid: 'ktx-14-portfolio-allocation-director',
    name: 'AI Portfolio Allocation Director',
    title: 'AI Portfolio Allocation Director',
    description: 'AI Portfolio Allocation Director leads strategic direction and executive decision-making for the Trading & Investments department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Portfolio Management', 'Market Analysis', 'Risk Assessment', 'Trade Execution', 'Compliance Monitoring'],
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '79% efficiency',
    replacesRole: 'AI Portfolio Allocation Director',
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$8384',
      tasksAutomatedDaily: 736,
      responseTime: '0.7s',
      accuracyRate: '95.9%',
    },
    hierarchy: {
      department: 'Trading & Investments',
      level: 'c_level',
      departmentId: 14,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
