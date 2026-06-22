import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-visa-documenter',
    uid: 'ktx-13-visa-documenter',
    name: 'AI Visa Documenter',
    title: 'AI Visa Documenter',
    description: 'AI Visa Documenter provides specialized expertise and executes critical tasks for the Administrative department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Office Management', 'Records Keeping', 'Communication Coordination', 'Travel Planning', 'Meeting Facilitation'],
    color: '#795548',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '81% efficiency',
    replacesRole: 'AI Visa Documenter',
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
      department: 'Administrative',
      level: 'specialist',
      departmentId: 13,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
