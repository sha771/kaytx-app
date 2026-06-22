import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-asset-manager',
    uid: 'ktx-15-asset-manager',
    name: 'AI Asset Manager',
    title: 'AI Asset Manager',
    description: 'AI Asset Manager manages team operations and ensures delivery excellence for the Real Estate & Property department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Property Valuation', 'Lease Management', 'Market Analysis', 'Tenant Relations', 'Property Maintenance'],
    color: '#8D6E63',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '87% efficiency',
    replacesRole: 'AI Asset Manager',
    subAgents: [
      { id: 'ai-lease-enforcer', uid: 'ktx-15-lease-enforcer', name: 'AI Lease Enforcer', title: 'AI Lease Enforcer', route: '/ai-agent/real-estate/lease-enforcer' },
      { id: 'ai-communication-coordinator', uid: 'ktx-15-communication-coordinator', name: 'AI Communication Coordinator', title: 'AI Communication Coordinator', route: '/ai-agent/real-estate/communication-coordinator' },
      { id: 'ai-listing-creator', uid: 'ktx-15-listing-creator', name: 'AI Listing Creator', title: 'AI Listing Creator', route: '/ai-agent/real-estate/listing-creator' }
    ],
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3424',
      tasksAutomatedDaily: 372,
      responseTime: '1.6s',
      accuracyRate: '97.7%',
    },
    hierarchy: {
      department: 'Real Estate & Property',
      level: 'manager',
      departmentId: 15,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
