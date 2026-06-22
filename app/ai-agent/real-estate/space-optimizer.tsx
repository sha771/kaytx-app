import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-space-optimizer',
    uid: 'ktx-15-space-optimizer',
    name: 'AI Space Optimizer',
    title: 'AI Space Optimizer',
    description: 'AI Space Optimizer provides specialized expertise and executes critical tasks for the Real Estate & Property department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Market Analysis', 'Tenant Relations', 'Property Maintenance', 'Investment Analysis', 'Zoning Compliance'],
    color: '#8D6E63',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '81% efficiency',
    replacesRole: 'AI Space Optimizer',
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
      department: 'Real Estate & Property',
      level: 'specialist',
      departmentId: 15,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
