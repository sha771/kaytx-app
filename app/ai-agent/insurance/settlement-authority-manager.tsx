import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-settlement-authority-manager',
    uid: 'ktx-16-settlement-authority-manager',
    name: 'AI Settlement Authority Manager',
    title: 'AI Settlement Authority Manager',
    description: 'AI Settlement Authority Manager manages team operations and ensures delivery excellence for the Insurance & Risk department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Customer Communication', 'Claims Processing', 'Underwriting', 'Policy Management', 'Risk Assessment'],
    color: '#FF7043',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '92% efficiency',
    replacesRole: 'AI Settlement Authority Manager',
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4759',
      tasksAutomatedDaily: 227,
      responseTime: '0.7s',
      accuracyRate: '95.6%',
    },
    hierarchy: {
      department: 'Insurance & Risk',
      level: 'manager',
      departmentId: 16,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
