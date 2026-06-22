import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-property-manager',
    uid: 'ktx-15-property-manager',
    name: 'AI Property Manager',
    title: 'AI Property Manager',
    description: 'AI Property Manager manages team operations and ensures delivery excellence for the Real Estate & Property department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Tenant Relations', 'Property Maintenance', 'Investment Analysis', 'Zoning Compliance', 'Real Estate Marketing'],
    color: '#8D6E63',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '88% efficiency',
    replacesRole: 'AI Property Manager',
    subAgents: [
      { id: 'ai-property-performance-monitor', uid: 'ktx-15-property-performance-monitor', name: 'AI Property Performance Monitor', title: 'AI Property Performance Monitor', route: '/ai-agent/real-estate/property-performance-monitor' },
      { id: 'ai-space-optimizer', uid: 'ktx-15-space-optimizer', name: 'AI Space Optimizer', title: 'AI Space Optimizer', route: '/ai-agent/real-estate/space-optimizer' },
      { id: 'ai-due-diligence-coordinator', uid: 'ktx-15-due-diligence-coordinator', name: 'AI Due Diligence Coordinator', title: 'AI Due Diligence Coordinator', route: '/ai-agent/real-estate/due-diligence-coordinator' }
    ],
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3691',
      tasksAutomatedDaily: 423,
      responseTime: '1.8s',
      accuracyRate: '98.4%',
    },
    hierarchy: {
      department: 'Real Estate & Property',
      level: 'manager',
      departmentId: 15,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
