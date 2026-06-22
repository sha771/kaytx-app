import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-talent-mobility-agent',
    uid: 'ktx-21-talent-mobility-agent',
    name: 'AI AI Talent Mobility Agent',
    title: 'AI Talent Mobility Agent',
    description: 'AI AI Talent Mobility Agent provides specialized expertise and executes critical tasks for the Supply Chain & Logistics department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Supply Chain Optimization', 'Procurement', 'Inventory Management', 'Supplier Relations', 'Demand Planning'],
    color: '#42A5F5',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '83% efficiency',
    replacesRole: 'AI Talent Mobility Agent',
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
      department: 'Supply Chain & Logistics',
      level: 'specialist',
      departmentId: 21,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
