import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-task-prioritizer',
    uid: 'ktx-04-task-prioritizer',
    name: 'AI Task Prioritizer',
    title: 'AI Task Prioritizer',
    description: 'AI Task Prioritizer provides specialized expertise and executes critical tasks for the Operations & Management department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Quality Assurance', 'Project Management', 'Capacity Planning', 'Vendor Management', 'Operational Analytics'],
    color: '#607D8B',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '88% efficiency',
    replacesRole: 'AI Task Prioritizer',
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
      department: 'Operations & Management',
      level: 'specialist',
      departmentId: 4,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
