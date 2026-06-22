import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-maintenance-scheduler',
    uid: 'ktx-04-maintenance-scheduler',
    name: 'AI Maintenance Scheduler',
    title: 'AI Maintenance Scheduler',
    description: 'AI Maintenance Scheduler provides specialized expertise and executes critical tasks for the Operations & Management department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Process Optimization', 'Resource Allocation', 'Workflow Automation', 'Quality Assurance', 'Project Management'],
    color: '#607D8B',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '83% efficiency',
    replacesRole: 'AI Maintenance Scheduler',
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
      department: 'Operations & Management',
      level: 'specialist',
      departmentId: 4,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
