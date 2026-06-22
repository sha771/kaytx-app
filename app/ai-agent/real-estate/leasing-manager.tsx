import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-leasing-manager',
    uid: 'ktx-15-leasing-manager',
    name: 'AI Leasing Manager',
    title: 'AI Leasing Manager',
    description: 'AI Leasing Manager manages team operations and ensures delivery excellence for the Real Estate & Property department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Market Analysis', 'Tenant Relations', 'Property Maintenance', 'Investment Analysis', 'Zoning Compliance'],
    color: '#8D6E63',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '81% efficiency',
    replacesRole: 'AI Leasing Manager',
    subAgents: [
      { id: 'ai-noi-optimizer', uid: 'ktx-15-noi-optimizer', name: 'AI NOI Optimizer', title: 'AI NOI Optimizer', route: '/ai-agent/real-estate/noi-optimizer' },
      { id: 'ai-comparable-analyzer', uid: 'ktx-15-comparable-analyzer', name: 'AI Comparable Analyzer', title: 'AI Comparable Analyzer', route: '/ai-agent/real-estate/comparable-analyzer' },
      { id: 'ai-underwriting-assistant', uid: 'ktx-15-underwriting-assistant', name: 'AI Underwriting Assistant', title: 'AI Underwriting Assistant', route: '/ai-agent/real-estate/underwriting-assistant' }
    ],
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
      level: 'manager',
      departmentId: 15,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
