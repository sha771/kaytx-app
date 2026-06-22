import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-property-marketing',
    uid: 'ktx-15-property-marketing',
    name: 'AI Property Marketing',
    title: 'AI Property Marketing',
    description: 'AI Property Marketing coordinates team activities and ensures quality output for the Real Estate & Property department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Investment Analysis', 'Zoning Compliance', 'Real Estate Marketing', 'Property Valuation', 'Lease Management'],
    color: '#8D6E63',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '82% efficiency',
    replacesRole: 'AI Property Marketing',
    subAgents: [
      { id: 'ai-lease-negotiator', uid: 'ktx-15-lease-negotiator', name: 'AI Lease Negotiator', title: 'AI Lease Negotiator', route: '/ai-agent/real-estate/lease-negotiator' },
      { id: 'ai-work-order-prioritizer', uid: 'ktx-15-work-order-prioritizer', name: 'AI Work Order Prioritizer', title: 'AI Work Order Prioritizer', route: '/ai-agent/real-estate/work-order-prioritizer' },
      { id: 'ai-lead-qualifier', uid: 'ktx-15-lead-qualifier', name: 'AI Lead Qualifier', title: 'AI Lead Qualifier', route: '/ai-agent/real-estate/lead-qualifier' }
    ],
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.0%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3869',
      tasksAutomatedDaily: 457,
      responseTime: '2.0s',
      accuracyRate: '98.8%',
    },
    hierarchy: {
      department: 'Real Estate & Property',
      level: 'team_lead',
      departmentId: 15,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
