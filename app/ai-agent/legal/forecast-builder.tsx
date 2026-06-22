import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-forecast-builder',
    uid: 'ktx-08-forecast-builder',
    name: 'AI AI Forecast Builder',
    title: 'AI Forecast Builder',
    description: 'AI AI Forecast Builder provides specialized expertise and executes critical tasks for the Legal & Compliance department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Legal Research', 'IP Protection', 'Dispute Resolution', 'Policy Development', 'Audit Management'],
    color: '#3F51B5',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '88% efficiency',
    replacesRole: 'AI Forecast Builder',
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
      department: 'Legal & Compliance',
      level: 'specialist',
      departmentId: 8,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
