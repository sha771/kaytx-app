import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-deal-screener',
    uid: 'ktx-15-deal-screener',
    name: 'AI Deal Screener',
    title: 'AI Deal Screener',
    description: 'AI Deal Screener provides specialized expertise and executes critical tasks for the Real Estate & Property department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Property Valuation', 'Lease Management', 'Market Analysis', 'Tenant Relations', 'Property Maintenance'],
    color: '#8D6E63',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '87% efficiency',
    replacesRole: 'AI Deal Screener',
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
      level: 'specialist',
      departmentId: 15,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
