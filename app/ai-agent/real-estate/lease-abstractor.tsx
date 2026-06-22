import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-lease-abstractor',
    uid: 'ktx-15-lease-abstractor',
    name: 'AI Lease Abstractor',
    title: 'AI Lease Abstractor',
    description: 'AI Lease Abstractor leads strategic direction and executive decision-making for the Real Estate & Property department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Tenant Relations', 'Property Maintenance', 'Investment Analysis', 'Zoning Compliance', 'Real Estate Marketing'],
    color: '#8D6E63',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '88% efficiency',
    replacesRole: 'AI Lease Abstractor',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$10603',
      tasksAutomatedDaily: 937,
      responseTime: '1.8s',
      accuracyRate: '98.4%',
    },
    hierarchy: {
      department: 'Real Estate & Property',
      level: 'c_level',
      departmentId: 15,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
