import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-portfolio-mix-manager',
    uid: 'ktx-16-portfolio-mix-manager',
    name: 'AI Portfolio Mix Manager',
    title: 'AI Portfolio Mix Manager',
    description: 'AI Portfolio Mix Manager manages team operations and ensures delivery excellence for the Insurance & Risk department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Claims Processing', 'Underwriting', 'Policy Management', 'Risk Assessment', 'Fraud Detection'],
    color: '#FF7043',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '83% efficiency',
    replacesRole: 'AI Portfolio Mix Manager',
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
      department: 'Insurance & Risk',
      level: 'manager',
      departmentId: 16,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
