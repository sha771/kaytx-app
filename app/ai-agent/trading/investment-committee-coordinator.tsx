import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-investment-committee-coordinator',
    uid: 'ktx-14-investment-committee-coordinator',
    name: 'AI Investment Committee Coordinator',
    title: 'AI Investment Committee Coordinator',
    description: 'AI Investment Committee Coordinator leads strategic direction and executive decision-making for the Trading & Investments department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Trade Execution', 'Compliance Monitoring', 'Performance Attribution', 'Derivatives Pricing', 'Quantitative Modeling'],
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '80% efficiency',
    replacesRole: 'AI Investment Committee Coordinator',
    infrastructure: {
      status: 'online',
      health: 85,
      uptime: '99.0%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$8795',
      tasksAutomatedDaily: 805,
      responseTime: '1.0s',
      accuracyRate: '96.5%',
    },
    hierarchy: {
      department: 'Trading & Investments',
      level: 'c_level',
      departmentId: 14,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
