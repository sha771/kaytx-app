import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-idea-scorer',
    uid: 'ktx-12-idea-scorer',
    name: 'AI Idea Scorer',
    title: 'AI Idea Scorer',
    description: 'AI Idea Scorer provides specialized expertise and executes critical tasks for the Research & Development department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Innovation Pipeline', 'Technology Scouting', 'Research Methodology', 'Patent Analysis', 'Prototype Development'],
    color: '#009688',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '93% efficiency',
    replacesRole: 'AI Idea Scorer',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.0%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3246',
      tasksAutomatedDaily: 338,
      responseTime: '1.5s',
      accuracyRate: '97.2%',
    },
    hierarchy: {
      department: 'Research & Development',
      level: 'specialist',
      departmentId: 12,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
