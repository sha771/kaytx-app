import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-rent-collector',
    uid: 'ktx-15-rent-collector',
    name: 'AI Rent Collector',
    title: 'AI Rent Collector',
    description: 'AI Rent Collector leads strategic direction and executive decision-making for the Real Estate & Property department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Lease Management', 'Market Analysis', 'Tenant Relations', 'Property Maintenance', 'Investment Analysis'],
    color: '#8D6E63',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '94% efficiency',
    replacesRole: 'AI Rent Collector',
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$10329',
      tasksAutomatedDaily: 891,
      responseTime: '1.7s',
      accuracyRate: '97.9%',
    },
    hierarchy: {
      department: 'Real Estate & Property',
      level: 'c_level',
      departmentId: 15,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
