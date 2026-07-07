import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-integration-planner',
    uid: 'ktx-06-integration-planner',
    name: 'AI Integration Planner',
    title: 'AI Integration Planner',
    description: 'AI Integration Planner provides specialized expertise and executes critical tasks for the Technology & Engineering department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Cloud Infrastructure', 'Technical Documentation', 'Code Generation', 'System Architecture', 'DevOps Automation'],
    color: '#1565C0',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '89% efficiency',
    replacesRole: 'AI Integration Planner',
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.2%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3958',
      tasksAutomatedDaily: 474,
      responseTime: '2.0s',
      accuracyRate: '99.1%',
    },
    hierarchy: {
      department: 'Technology & Engineering',
      level: 'specialist',
      departmentId: 6,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
