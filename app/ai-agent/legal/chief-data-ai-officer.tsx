import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-chief-data-ai-officer',
    uid: 'ktx-08-chief-data-ai-officer',
    name: 'AI AI Chief Data & AI Officer',
    title: 'AI Chief Data & AI Officer',
    description: 'AI AI Chief Data & AI Officer leads strategic direction and executive decision-making for the Legal & Compliance department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Risk Assessment', 'Legal Research', 'IP Protection', 'Dispute Resolution', 'Policy Development'],
    color: '#3F51B5',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '77% efficiency',
    replacesRole: 'AI Chief Data & AI Officer',
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11562',
      tasksAutomatedDaily: 598,
      responseTime: '2.3s',
      accuracyRate: '94.5%',
    },
    hierarchy: {
      department: 'Legal & Compliance',
      level: 'c_level',
      departmentId: 8,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
