import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-data-science',
    uid: 'ktx-08-vp-data-science',
    name: 'AI AI VP Data Science',
    title: 'AI VP Data Science',
    description: 'AI AI VP Data Science drives department strategy and oversees operations for the Legal & Compliance department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Risk Assessment', 'Legal Research', 'IP Protection', 'Dispute Resolution', 'Policy Development'],
    color: '#3F51B5',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$1,800/mo',
    efficiency: '81% efficiency',
    replacesRole: 'AI VP Data Science',
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$10466',
      tasksAutomatedDaily: 914,
      responseTime: '1.8s',
      accuracyRate: '98.1%',
    },
    hierarchy: {
      department: 'Legal & Compliance',
      level: 'vp_director',
      departmentId: 8,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
