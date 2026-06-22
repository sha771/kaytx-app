import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-underwriting-assistant',
    uid: 'ktx-15-underwriting-assistant',
    name: 'AI Underwriting Assistant',
    title: 'AI Underwriting Assistant',
    description: 'AI Underwriting Assistant provides specialized expertise and executes critical tasks for the Real Estate & Property department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Lease Management', 'Market Analysis', 'Tenant Relations', 'Property Maintenance', 'Investment Analysis'],
    color: '#8D6E63',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '90% efficiency',
    replacesRole: 'AI Underwriting Assistant',
    infrastructure: {
      status: 'online',
      health: 85,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4225',
      tasksAutomatedDaily: 125,
      responseTime: '2.3s',
      accuracyRate: '94.3%',
    },
    hierarchy: {
      department: 'Real Estate & Property',
      level: 'specialist',
      departmentId: 15,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
