import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-cross-border-payment-optimizer',
    uid: 'ktx-14-cross-border-payment-optimizer',
    name: 'AI Cross-border Payment Optimizer',
    title: 'AI Cross-border Payment Optimizer',
    description: 'AI Cross-border Payment Optimizer leads strategic direction and executive decision-making for the Trading & Investments department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Market Analysis', 'Risk Assessment', 'Trade Execution', 'Compliance Monitoring', 'Performance Attribution'],
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '86% efficiency',
    replacesRole: 'AI Cross-border Payment Optimizer',
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$8521',
      tasksAutomatedDaily: 759,
      responseTime: '0.8s',
      accuracyRate: '96.1%',
    },
    hierarchy: {
      department: 'Trading & Investments',
      level: 'c_level',
      departmentId: 14,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
