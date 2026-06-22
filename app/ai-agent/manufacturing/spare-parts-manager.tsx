import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-spare-parts-manager',
    uid: 'ktx-18-spare-parts-manager',
    name: 'AI Spare Parts Manager',
    title: 'AI Spare Parts Manager',
    description: 'AI Spare Parts Manager manages team operations and ensures delivery excellence for the Manufacturing & Production department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Safety Compliance', 'Process Engineering', 'Production Planning', 'Quality Control', 'Inventory Management'],
    color: '#5C6BC0',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '89% efficiency',
    replacesRole: 'AI Spare Parts Manager',
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.2%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3958',
      tasksAutomatedDaily: 474,
      responseTime: '2.0s',
      accuracyRate: '99.1%',
    },
    hierarchy: {
      department: 'Manufacturing & Production',
      level: 'manager',
      departmentId: 18,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
