import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-data-platform-planner',
    uid: 'ktx-08-data-platform-planner',
    name: 'AI AI Data Platform Planner',
    title: 'AI Data Platform Planner',
    description: 'AI AI Data Platform Planner provides specialized expertise and executes critical tasks for the Legal & Compliance department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Contract Management', 'Regulatory Compliance', 'Risk Assessment', 'Legal Research', 'IP Protection'],
    color: '#3F51B5',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '83% efficiency',
    replacesRole: 'AI Data Platform Planner',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4136',
      tasksAutomatedDaily: 108,
      responseTime: '2.2s',
      accuracyRate: '94.0%',
    },
    hierarchy: {
      department: 'Legal & Compliance',
      level: 'specialist',
      departmentId: 8,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
